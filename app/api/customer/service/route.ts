import prisma from "@/db";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
  if(!session || !session.user || session.user.role!=='CUSTOMER'){
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = parseInt(session.user.id);
  try {
    const customer = await prisma.customer.findUnique({
      where:{
        userId:userId
      }
    })
    if(!customer){
      return NextResponse.json({
        msg: "Customer Id not found",
        status:'failure'
      });
    }
    const customerId = customer.id
    const service = await req.json();
    const ServiceExist = await prisma.service.findFirst({
        where:{
            vehicleId:parseInt(service.vehicleId),
            description:service.description,
            customerId:customerId
        }
    })
    if(ServiceExist){
        return NextResponse.json({
            msg: "Service already exist",
            status:'failure'
          });
    }
    const newService = await prisma.service.create({
        data:{
            vehicleId:parseInt(service.vehicleId),
            description:service.description,
            customerId:customerId,
            serviceType:service.serviceType,
            scheduledAt:service.scheduledAt,
        }
    })
    return NextResponse.json(
        {
          msg: "New service added",
          status:"success",
          service:newService
        },
        { status: 200 }
      );
  } catch (error) {
    console.error("Error adding new vehicle:", error);
    return NextResponse.json(
      {
        msg: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if(!session || !session.user || session.user.role!=='CUSTOMER'){
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}
const userId = parseInt(session.user.id);
try {
  const customer = await prisma.customer.findUnique({
    where:{
      userId:userId
    }
  })
  if(!customer){
    return NextResponse.json({
      msg: "Customer Id not found",
      status:'failure'
    });
  }
  const customerId = customer.id
  const serviceId  = headers().get('id')
  await prisma.service.delete({
      where:{
          id:parseInt(serviceId || '-1'),
          customerId:customerId
      }
  })
  return NextResponse.json(
      {
        msg: "Service Deleted",
        status:"success",
      },
      { status: 200 }
    );
} catch (error) {
  console.error("Error deleting service:", error);
  return NextResponse.json(
    {
      msg: "Internal server error",
    },
    { status: 500 }
  );
}
}