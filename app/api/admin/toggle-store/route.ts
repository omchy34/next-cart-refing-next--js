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

        const { storeId } = await request.json();

        if (!storeId) return NextResponse.json({
            message: "missing storeId"
        })

        // find store 

        const store = await prisma.store.findUnique({
            where: { id: storeId }
        })

        if(!store) return NextResponse.json({
            error: "Store not found"
        }, { status: 400 })

        const res = await prisma.store.update({
            where: {id: storeId},
            data: {isActive: !store.isActive}
        })


        return NextResponse.json({ message:"store update successfully" } )
        
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}