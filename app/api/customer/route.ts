import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next" 
import client from "../../../db";
import authOptions from "@/lib/auth";
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if(!session || !session.user || session.user.role!=='CUSTOMER'){
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = parseInt(session.user.id);
  try {
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
    console.log(error)
    return NextResponse.json({ error: "Failed to fetch customer details" });
  }
}
