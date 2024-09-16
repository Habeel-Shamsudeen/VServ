import prisma from "@/db";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
  if(!session || !session.user || session.user.role!=='CUSTOMER'){
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = parseInt(session.user.id);
  try {
    const { vehicle } = await req.json();
    const vehicleExist = await prisma.vehicle.findFirst({
        where:{
            make:vehicle.make,
            model:vehicle.model,
            year:vehicle.year,
            customerId:userId
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
            customerId:userId
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