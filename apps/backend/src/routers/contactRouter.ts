import express, { type Request, type Response } from "express";
import { db } from "@repo/db";
import { clerkClient, getAuth, requireAuth } from "@clerk/express";
import { HttpStatusCodes } from "../utils/interfaces";
import { CreateContactInput, GetContactByIdRequest } from "@repo/types/src/backend/contactTypes";

export const contactRouter = express.Router();

contactRouter.post("/createContact", requireAuth(), async (req: Request, res: Response) => {
    const schema = CreateContactInput;

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return void res.status(HttpStatusCodes.BAD_REQUEST).json({
            code: HttpStatusCodes.BAD_REQUEST,
            message: "Invalid request body",
            response: null
        });
    }   

    const { email, firstName, lastName } = parsed.data;

    try {

        const { userId } = getAuth(req);

        if (!userId) {
            return void res.status(HttpStatusCodes.UNAUTHORIZED).json({
                code: HttpStatusCodes.UNAUTHORIZED,
                message: "Unauthorized",
                response: null
            });
        }

        const user = await clerkClient.users.getUser(userId);
        const userFromDb = await db.user.findFirst({
            where: {
                id: userId  
            }
        });

        if (!userFromDb || user) {
            return void res.status(HttpStatusCodes.NOT_FOUND).json({
                code: HttpStatusCodes.NOT_FOUND,
                message: "User not found",
                response: null
            });
        }

        const contact = await db.contact.create({
            data: {
                email,
                firstName,
                lastName,
                userId: userId
            }
        });

        return void res.status(HttpStatusCodes.OK).json({
            code: HttpStatusCodes.OK,
            message: "Contact created successfully",
            response: contact
        });

    } catch (error) {
        console.error(error);
        return void res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
            response: null
        });
    } finally {
        await db.$disconnect();
    }

});

contactRouter.get("/getContactById", requireAuth(), async (req: Request, res: Response) => {
    const schema = GetContactByIdRequest;

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return void res.status(HttpStatusCodes.BAD_REQUEST).json({
            code: HttpStatusCodes.BAD_REQUEST,
            message: "Invalid request body",
            response: null
        });
    }

    const { id } = parsed.data;

    try {
        const contact = await db.contact.findFirst({
            where: {
                id: id
            }
        });

        return void res.status(HttpStatusCodes.OK).json({
            code: HttpStatusCodes.OK,
            message: "Contact fetched successfully",
            response: contact
        });
    } catch (error) {
        console.error(error);
        return void res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
            response: null
        });
    } finally {
        await db.$disconnect();
    }
});

contactRouter.get("/getContactsOfUser", requireAuth(), async (req: Request, res: Response) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return void res.status(HttpStatusCodes.UNAUTHORIZED).json({
            code: HttpStatusCodes.UNAUTHORIZED,
            message: "Unauthorized",
            response: null
        });
    }

    try {
        const user = await clerkClient.users.getUser(userId);

        if (!user) {
            return void res.status(HttpStatusCodes.NOT_FOUND).json({
                code: HttpStatusCodes.NOT_FOUND,
                message: "User not found",
                response: null
            });
        }

        const contacts = await db.contact.findMany({
            where: {
                userId: userId
            }
        });

        return void res.status(HttpStatusCodes.OK).json({
            code: HttpStatusCodes.OK,
            message: "Contacts fetched successfully",
            response: contacts
        });
    } catch (error) {
        console.error(error);
        return void res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
            response: null
        });
    } finally {
        await db.$disconnect();
    }
})
