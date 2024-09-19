import prisma from "@/db";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { mechanic } = await req.json();
    const mechanicExist = await prisma.user.findFirst({
      where: {
        email: mechanic.email,
        role: "MECHANIC",
      },
    });
    if (mechanicExist) {
      return NextResponse.json({
        msg: "Mechanic with the following credentials already exist",
        status: "failure",
      });
    }
    const newMech = await prisma.user.create({
      data: {
        name: mechanic.name,
        email: mechanic.email,
        password: mechanic.password,
        phoneNumber: mechanic.phoneNumber,
        role: "MECHANIC",
      },
    });

    const newMechanic = await prisma.mechanic.create({
      data: {
        userId: newMech.id,
        speciality: mechanic.speciality,
      },
    });
    const mechanics = await prisma.user.findUnique({
      where: {
        id:newMech.id,
        role: "MECHANIC",
      },
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        mechanic: {
          select: {
            id: true,
            services: true,
            speciality: true,
          },
        },
      },
    });
    return NextResponse.json(
      {
        msg: "New mechanic added",
        status: "success",
        mechanic: mechanics
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding new Mechanic:", error);
    return NextResponse.json(
      {
        msg: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const id = headers().get("id");
    const mechanic = await prisma.user.findFirst({
      where: {
        id: parseInt(id || "-1"),
        role: "MECHANIC",
      },
    });

    if (!mechanic) {
      return NextResponse.json(
        {
          msg: "Mechanic not found",
          status: "failure",
        },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: {
        id: parseInt(id || "-1"),
      },
    });
    return NextResponse.json(
      {
        msg: "Mechanic Deleted",
        status: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Mechanic:", error);
    return NextResponse.json(
      {
        msg: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const mechanics = await prisma.user.findMany({
      where: {
        role: "MECHANIC",
      },
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        mechanic: {
          select: {
            id: true,
            services: true,
            speciality: true,
          },
        },
      },
    });
    return NextResponse.json(
      {
        msg: "Mechanic fetched",
        status: "success",
        mechanics,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Mechanic:", error);
    return NextResponse.json(
      {
        msg: "Internal server error",
      },
      { status: 500 }
    );
  }
}
