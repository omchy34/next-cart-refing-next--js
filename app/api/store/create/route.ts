import imagekit from "@/config/imageKit";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// create store 


export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const formData = await request.formData();

        const name = formData.get("name") as string
        const username = formData.get("username") as string;
        const description = formData.get("description") as string;
        const email = formData.get("email") as string;
        const contact = formData.get("contact") as string;
        const address = formData.get("address") as string;
        const image = formData.get("image") as File

        if (!name ||
            !username ||
            !description ||
            !email ||
            !contact ||
            !address ||
            !image
        ) {
            return NextResponse.json({ message: "fill all required details" }, { status: 400 })
        }

        const store = await prisma.store.findFirst({
            where: { userId: userId },
        })

        if (store) return NextResponse.json({ status: store.status });

        const isUsernameTaken = await prisma.store.findFirst({
            where: { username: username.toLowerCase() }
        });


        if (isUsernameTaken) return NextResponse.json({ error: "username is alredyy taken" }, { status: 400 })

        const buffer = Buffer.from(await image.arrayBuffer());

        const response = await imagekit.upload({
            file: buffer,
            fileName: image.name,
            folder: "CartLogos",
        })

        const optimizedImage = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: "auto" },
                { format: "webp" },
                { width: "512" }
            ]
        })

        const newStore = await prisma.store.create({
            data: {
                userId,
                name,
                description,
                username,
                address,
                logo: optimizedImage,
                email,
                contact,
            }
        })


        return NextResponse.json({ message: "applied, waiting for approval" })

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}

// check user alredy register or not 

export async function GET(request: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const store = await prisma.store.findFirst({
            where: { userId: userId },
        })


        if (store) return NextResponse.json({ status: store.status });

        return NextResponse.json({ status: "Not registered" })

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}