import express, { type Request, type Response } from "express";
import { db } from "@repo/db";
import { clerkClient, getAuth, requireAuth } from "@clerk/express";
import { HttpStatusCodes } from "../utils/interfaces";
import z from "zod";
import { CreateCampaignInput, GetCampaignByIdRequest, GetCampaignsRequest } from "@repo/types/src/backend/campaignType";

export const campaignRouter = express.Router();

campaignRouter.post("/createCampaign", requireAuth(), async (req: Request, res: Response) => {
    const schema = CreateCampaignInput;

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return void res.status(HttpStatusCodes.BAD_REQUEST).json({
            code: HttpStatusCodes.BAD_REQUEST,
            message: "Invalid request body",
            response: null
        });
    }   

    const { name, subject, content } = parsed.data;

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
        
        const userFromDb = await db.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user || !userFromDb) {
            return void res.status(HttpStatusCodes.UNAUTHORIZED).json({
                code: HttpStatusCodes.UNAUTHORIZED,
                message: "Unauthorized",
                response: null
            });
        }

        const campaign = await db.campaign.create({
            data: {
                name,
                subject,
                content,
                userId: userFromDb.id
            }
        }); 

        return void res.status(HttpStatusCodes.CREATED).json({
            code: HttpStatusCodes.CREATED,
            message: "Campaign created",
            response: campaign
        });

    } catch (error) {
        console.error(error);
        return void res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            response: null
        });
    } finally {
        await db.$disconnect();
    }
});

campaignRouter.get("/getCampaignById", requireAuth(), async (req: Request, res: Response) => {
    const schema = GetCampaignByIdRequest;

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

        const { userId } = getAuth(req);

        if (!userId) {
            return void res.status(HttpStatusCodes.UNAUTHORIZED).json({
                code: HttpStatusCodes.UNAUTHORIZED,
                message: "Unauthorized",
                response: null
            });
        }   

        const user = await clerkClient.users.getUser(userId);
        const userFromDb = await db.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!userFromDb || !user) {
            return void res.status(HttpStatusCodes.UNAUTHORIZED).json({
                code: HttpStatusCodes.UNAUTHORIZED,
                message: "Unauthorized",
                response: null
            });
        }



        const campaign = await db.campaign.findUnique({
            where: { id }
        });

        return void res.status(HttpStatusCodes.OK).json({
            code: HttpStatusCodes.OK,
            message: "Campaign fetched",
            response: campaign
        });

    } catch (error) {
        console.error(error);
        return void res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            response: null
        });
    } finally {
        await db.$disconnect();
    }
});

campaignRouter.get("/getCampaigns", requireAuth(), async (req: Request, res: Response) => {
    const schema = GetCampaignsRequest;

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return void res.status(HttpStatusCodes.BAD_REQUEST).json({
            code: HttpStatusCodes.BAD_REQUEST,
            message: "Invalid request body",
            response: null
        });
    }

    const { userId } = parsed.data;

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
        const userFromDb = await db.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!userFromDb || !user) {
            return void res.status(HttpStatusCodes.UNAUTHORIZED).json({
                code: HttpStatusCodes.UNAUTHORIZED,
                message: "Unauthorized",
                response: null
            });
        }

        const campaigns = await db.campaign.findMany({
            where: {
                userId: userFromDb.id
            }
        });

        return void res.status(HttpStatusCodes.OK).json({
            code: HttpStatusCodes.OK,
            message: "Campaigns fetched",
            response: campaigns
        });

    } catch (error) {
        console.error(error);
        return void res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            response: null
        });
    } finally {
        await db.$disconnect();
    }
});