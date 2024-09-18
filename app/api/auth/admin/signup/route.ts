import { NextRequest, NextResponse } from "next/server";
import client from "../../../../../db";

export async function POST(req: NextRequest) {
  try {
    const admin  = await req.json();
    const adminExist = await client.user.findFirst({
      where: {
        email: admin.email,
        role:'ADMIN'
      },
    });
    if (adminExist) {
      return NextResponse.json({
        msg: "Email already in use",
        status:'failure'
      });
    }
    const newUser = await client.user.create({
      data: {
        name:admin.name,
        email: admin.email,
        password: admin.password,
        role: "ADMIN",
      },
    });

    return NextResponse.json(
      {
        msg: "Admin creation Successfull",
        status:"success"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating admin user:", error);
    return NextResponse.json(
      {
        msg: "Internal server error",
      },
      { status: 500 }
    );
  }
}
