import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next" 
import client from "../../../db";
import authOptions from "@/lib/auth";
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if(!session || !session.user || session.user.role!=='MECHANIC'){
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = parseInt(session.user.id);
  try {
    const mechanic = await client.mechanic.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        services: true
        },
      }
    );
    if (!mechanic) {
      throw new Error(`Mechanic with User ID ${userId} not found`);
    }
    return NextResponse.json({ mechanic });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to fetch Mehcanic details" });
  }
}
