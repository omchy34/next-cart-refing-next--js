import { prisma } from "@/lib/prisma";
import authSaller from "@/middlewere/authSaller";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const isSaller = await authSaller(userId)

        if (!isSaller) {
            return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
        }

        const storeInfo = await prisma.store.findUnique({
            where: { userId }
        })

        return NextResponse.json({isSaller,storeInfo})

    } catch (error:any) {
        console.error(error)
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}