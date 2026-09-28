import { prisma } from "@/lib/prisma";
import authAdmin from "@/middlewere/authAdmin";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {


    try {
        const { userId } = await auth();

        if (!userId) return NextResponse.json({ message: "unauthorized" }, { status: 401 })

        const isAdmin = authAdmin(userId);

        if (!isAdmin) return NextResponse.json({ message: 'not authorized' }, { status: 401 })

        const { storeId, status } = await request.json();

        if (status === "approved") {
            await prisma.store.update({
                where: { id: storeId },
                data: { status: 'approved', isActive: true }
            })
        } else if (status === "rejected") {
            await prisma.store.update({
                where: { id: userId },
                data: { status: "rejected" }
            })
        }

        return NextResponse.json({ message: status + "successfully" })
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }

}

export async function GET(request: Request) {

    try {
        const { userId } = await auth();

        if (!userId) return NextResponse.json({ message: "unauthorized" }, { status: 401 })

        const isAdmin = authAdmin(userId);

        if (!isAdmin) return NextResponse.json({ message: 'not authorized' }, { status: 401 })

        const allRequest = await prisma.store.findMany({
            where: { status: { in: ['pending', 'rejected'] } },
            include: { user: true }
        })

        return NextResponse.json({ allRequest })
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}