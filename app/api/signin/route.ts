import client from "../../../db"

export async function GET() {
    const user = await client.user.findFirst({})
    return Response.json({ name: "habeel",
        user:user
     })
}