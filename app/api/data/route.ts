import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// store info 
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)

        const username = searchParams.get('username')?.toLocaleLowerCase();
        if (!username) return NextResponse.json({ message: "missing username" }, { status: 400 })

        const store = await prisma.store.findUnique({
            where: { username, isActive: true },
            include: { Product: { include: { rating: true } } }
        })

        if(!store) return NextResponse.json({message: "store not found"}, {status: 404})

        return NextResponse.json({store})
    } catch (error:any) {
        console.error(error)
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}