//app/api/Product/route.tsx

import Product from "@/app/(public)/product/[productId]/page";
import imagekit from "@/config/imageKit";
import { prisma } from "@/lib/prisma";
import authSaller from "@/middlewere/authSaller";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";
//  add new product

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
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
        const formData = await request.formData();


        const name = formData.get("name") as string
        const description = formData.get("description") as string
        const mrp = Number(formData.get("mrp"))
        const price = Number(formData.get("price"))
        const images = formData.getAll("images") as File[]
        const category = formData.get("category") as string


        if (!name ||
            !description ||
            isNaN(mrp) ||
            isNaN(price) ||
            !images ||
            !category
        ) {
            return NextResponse.json({ message: "Missing Product details " }, { status: 400 })
        }

        // upload image to imgKit

        const imageUrl = await Promise.all(images.map(async (image) => {
            const buffer = Buffer.from(await image.arrayBuffer());

            const response = await imagekit.upload({
                file: buffer,
                fileName: image.name,
                folder: "products"
            })
            const url = imagekit.url({
                path: response.filePath,
                transformation: [
                    { quality: 'auto' },
                    { format: "webp" },
                    { width: "1024" }
                ]
            })
            return url;
        }))


        const addProduct = await prisma.product.create({
            data: {
                name,
                category,
                description,
                mrp,
                price,
                images: imageUrl,
                storeId,
            }
        })

        return NextResponse.json({ message: "Product added successfully", addProduct }, { status: 201 })
    } catch (error: any) {
        console.error(error)
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}

// get all product of saller 
export async function GET(request: Request) {
    try {

        const { userId } = await auth();
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

        const sallerProduct = await prisma.product.findMany({ where: { storeId } });

        return NextResponse.json({ sallerProduct })
    } catch (error: any) {
        console.error(error)
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}