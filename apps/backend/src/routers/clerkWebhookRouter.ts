import express, { type Request, type Response } from "express";
import 'dotenv/config'
import { Webhook } from "svix";
import { db } from "@repo/db";

export const clerkWebhookRouter = express.Router();

clerkWebhookRouter.post("/", async (req: Request, res: Response) => {
    const event = req.body;

    try {

        if (event.type === "user.created") {
            const user = event.data;
            const { id, email_addresses, first_name, last_name } = user;
            
            const createUser = await db.user.create({
                data: {
                    id,
                    email: email_addresses[0].email_address,
                    firstName: first_name,
                    lastName: last_name,
                }
            })

            return void res.status(200).json({
                success: true,
                message: 'User created',
                data: createUser,
            })
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

    await db.$disconnect();
    return void res.status(200).json({
        success: true,
        message: 'Webhook received',
    })

});
