import auth from "@/lib/auth"
import NextAuth from "next-auth"

const handler = NextAuth(auth)

export const GET = handler;
export const POST = handler;
