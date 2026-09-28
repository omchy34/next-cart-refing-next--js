//middlewere/authSaller.ts

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";


const authSaller = async (userId: string): Promise<string | NextResponse> => {

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { store: true },
        })

        if (user?.store) {
            if (user.store.status === "approved") {
                return user.store.id
            }
            return NextResponse.json({ message: "Store not approved" }, { status: 403 })
        } else {
            return NextResponse.json({ message: "Store not found" }, { status: 404 })
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}

export default authSaller 