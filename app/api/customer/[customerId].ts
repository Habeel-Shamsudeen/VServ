import { NextRequest, NextResponse } from "next/server";
import client from "../../../db";
export async function GET(req: NextRequest,{ params }: { params: { customerId: string } }) {
  
  try {
    const userId = Number(params.customerId);
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    const customer = await client.customer.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        vehicles: true,
        services: {
          include: {
            mechanic: true,
            vehicle: true,
          },
        },
      },
    });
    if (!customer) {
      throw new Error(`Customer with ID ${userId} not found`);
    }
    return NextResponse.json({ customer });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customer details" });
  }
}
