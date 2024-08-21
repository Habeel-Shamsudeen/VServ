import { NextRequest, NextResponse } from "next/server";
import client from "../../../../../db";

export async function POST(req: NextRequest) {
  try {
    const { customer } = await req.json();
    const userExist = await client.user.findFirst({
      where: {
        email: customer.email,
        role:'CUSTOMER'
      },
    });
    if (userExist) {
      return NextResponse.json({
        msg: "Email already in use",
        status:'failure'
      });
    }
    const newUser = await client.user.create({
      data: {
        name:customer.name,
        email: customer.email,
        password: customer.password,
        phoneNumber: customer.phno,
        role: "CUSTOMER",
      },
    });

    const newCustomer = await client.customer.create({
      data: {
        userId: newUser.id,
        address: customer.address,
      },
    });
    return NextResponse.json(
      {
        msg: "Signup Successfull",
        status:"success"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user and customer:", error);
    return NextResponse.json(
      {
        msg: "Internal server error",
      },
      { status: 500 }
    );
  }
}
