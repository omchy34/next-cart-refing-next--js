import { clerkClient } from "@clerk/nextjs/server"

const authAdmin = async (userId: string): Promise<boolean> => {
    try {
        if (!userId) return false

        const client = await clerkClient()
        const user = await client.users.getUser(userId)

        const email = user.primaryEmailAddress?.emailAddress
            ?? user.emailAddresses[0]?.emailAddress
        if (!email) return false

        const adminEmails = (process.env.ADMIN_EMAIL ?? "")
            .split(",")
            .map((e) => e.trim().toLowerCase())

        return adminEmails.includes(email.toLowerCase())
    } catch (error) {
        console.error(error)
        return false
    }
}

export default authAdmin