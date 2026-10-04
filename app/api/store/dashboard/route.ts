import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server";
import authSaller from "@/middlewere/authSaller";
import { prisma } from "@/lib/prisma";

// for saller
export async function GET(request: Request) {
    try {

        const { userId } = await auth();
        if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 400 })

        const storeId = await authSaller(userId);

        if (storeId instanceof NextResponse) {
            return storeId;
        }
        if (!storeId) return NextResponse.json({ message: "Unauthrized store" }, { status: 400 })

        const order = await prisma.order.findMany({
            where: { storeId }
        })
        // rating with product
        const products = await prisma.product.findMany({
            where: { storeId }
        })

        const rating = await prisma.rating.findMany({
            where: { productId: { in: products.map((product) => product.id) } },
            include: { user: true, product: true }
        })

        const dashboardData = {
            rating,
            totalOrder: order.length,
            totalEarnings: Math.round(order.reduce((acc, order) => acc + order.total, 0)),
            totalProduct: products.length
        }

        return NextResponse.json({dashboardData})

    } catch (error: any) {
        console.error(error)
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }

}