

// stock of product 

import { prisma } from "@/lib/prisma";
import authSaller from "@/middlewere/authSaller";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        const { productId } = await request.json()

        
        if (!productId) {
            return NextResponse.json({ message: "missing detail productId" }, { status: 401 });
        }

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const storeId = await authSaller(userId);
        if (!storeId) {
            return NextResponse.json({ message: "Not authorized" }, { status: 401 });
        }
        if (storeId instanceof NextResponse) {
            return storeId;
        }

        const Product = await prisma.product.findFirst({
            where: { id: productId, storeId }
        })

        if (!Product) return NextResponse.json({ message: "product not found" }, { status: 404 });


        await prisma.product.update({
            where: { id: productId },
            data: { inStock: !Product?.inStock }
        })

        return NextResponse.json({ message: 'product stock updated successfully' })
    } catch (error:any) {
        console.error(error)
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}