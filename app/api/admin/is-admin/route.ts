import authAdmin from "@/middlewere/authAdmin";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ message: "unauthorized" }, { status: 401 })

        const isAdmin = await authAdmin(userId)

        if (!isAdmin) {
            return NextResponse.json({ message: "not authorized" }, { status: 401 })
        }
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}