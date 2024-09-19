import prisma from "@/db";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const services = await prisma.service.findMany({
      include: {
        mechanic: {
          include: {
            user: true, // This will include all mechanic-related user details
          },
        },
        customer: {
          include: {
            user: true, // This will include all customer-related user details
          },
        },
        vehicle: true, // This will include all vehicle details
      },
    });
    return NextResponse.json(
      {
        msg: "Services fetched",
        status: "success",
        services,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      {
        msg: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  
    try {
      const { serviceId, mechanicId } = await req.json();
  
      // Validate inputs
      if (!serviceId || !mechanicId) {
        return NextResponse.json({ message: "Missing parameters" }, { status: 400 });
      }
  
      // Check if the service exists
      const service = await prisma.service.findUnique({
        where: { id: parseInt(serviceId) },
      });
  
      if (!service) {
        return NextResponse.json({ message: "Service not found" }, { status: 404 });
      }
  
      // Check if the mechanic exists
      const mechanic = await prisma.mechanic.findUnique({
        where: { id: parseInt(mechanicId) },
      });
  
      if (!mechanic) {
        return NextResponse.json({ message: "Mechanic not found" }, { status: 404 });
      }
  
      // Update the service with the mechanic
      const updatedService = await prisma.service.update({
        where: { id: parseInt(serviceId) },
        data: {
          mechanicId: parseInt(mechanicId),
          status: 'ASSIGNED',
        },
        include: {
          mechanic: {
            include: {
              user: true,
            },
          },
          customer: {
            include: {
              user: true,
            },
          },
          vehicle: true,
        },
      });
  
      return NextResponse.json(
        {
          msg: "Service assigned to mechanic",
          status: "success",
          service: updatedService,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error assigning service:", error);
      return NextResponse.json(
        {
          msg: "Internal server error",
        },
        { status: 500 }
      );
    }
  }
