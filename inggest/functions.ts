// inngest/functions.ts
import { inngest } from "./client";
import prisma from '../prisma'

export const syncUserCreation = inngest.createFunction({
    id: 'sync-user-creation',
    triggers: [
        {
            event: "clerk/user.created",
        }
    ]
},

    async ({ event }) => {
        const { data } = event;
        await prisma.user.create({
            data: {
                id: data.id,
                email: data.email_addresses[0].email_address,
                name: `${data.first_name} ${data.last_name}`,
                image: data.image_url,
            }
        })
    }
)

// inggest update user data 

export const syncUserDataUpdate = inngest.createFunction(
    {
        id: "sync-user-update",
        triggers: [{
            event: "clerk/user.updated"
        }]
    },

    async({event}) => {
        const {data} = event ;

        await prisma.user.update({
            where:{id: data.id},
             data: {
                email: data.email_addresses[0].email_address,
                name: `${data.first_name} ${data.last_name}`,
                image: data.image_url,
            }
        })
    }
)

// inngest delete user 

export const syncUserDeletion = inngest.createFunction(
    {
        id: "sync-user-delete",
        triggers:[{
            event: "clerk/event.deleted"
        }]
    },

    async({event}) => {
        const {data} = event ;

        await prisma.user.delete({
            where:{id: data.id},
        })
    }
)