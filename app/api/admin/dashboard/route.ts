import { prisma } from "@/lib/prisma";
import authAdmin from "@/middlewere/authAdmin";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        const { userId } = await auth();
    
        if (!userId) return NextResponse.json({ message: "unauthorized" }, { status: 401 })
    
        const isAdmin = authAdmin(userId);
    
        if (!isAdmin) return NextResponse.json({ message: 'not authorized' }, { status: 401 })
    
        const allStore = await prisma.store.count()
    
        const Orders = await prisma.order.count()
    
        const TotalOrders = await prisma.order.findMany({
            select: {
                createdAt: true,
                total: true
            }
        })
    
        let revenue = 0
        TotalOrders.forEach(order => {
            revenue += order.total
        })
    
        const totalRevenue = revenue.toFixed(2)
    
        const product = await prisma.product.count()
    
        const dashboardData = {
            allStore,
            Orders,
            totalRevenue,
            product
        }
        return NextResponse.json({
            dashboardData
        })
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }

}