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
    const { vehicle } = await req.json();
    const vehicleExist = await prisma.vehicle.findFirst({
        where:{
            make:vehicle.make,
            model:vehicle.model,
            year:vehicle.year,
            customerId:customerId
        }
    })
    if(vehicleExist){
        return NextResponse.json({
            msg: "Vehicle already exist",
            status:'failure'
          });
    }
    const newVehicle = await prisma.vehicle.create({
        data:{
            make:vehicle.make,
            model:vehicle.model,
            year:vehicle.year,
            customerId:customerId
        }
    })
    return NextResponse.json(
        {
          msg: "New vehicle added",
          status:"success",
          vehicle:newVehicle
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
  const vehicleId  = headers().get('id')
  const vehicleDelete = await prisma.vehicle.delete({
      where:{
          id:parseInt(vehicleId || '-1'),
          customerId:customerId
      }
  })
  return NextResponse.json(
      {
        msg: "Vehicle Deleted",
        status:"success",
      },
      { status: 200 }
    );
} catch (error) {
  console.error("Error deleting vehicle:", error);
  return NextResponse.json(
    {
      msg: "Internal server error",
    },
    { status: 500 }
  );
}
}