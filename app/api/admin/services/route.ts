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
