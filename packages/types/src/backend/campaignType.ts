import { z } from "zod";

export const CampaignStatus = z.enum(["DRAFT", "SCHEDULED", "SENT"]);
export type CampaignStatus = z.infer<typeof CampaignStatus>;

export const Campaign = z.object({
  id: z.string(),
  name: z.string(),
  subject: z.string(),
  content: z.string(),
  status: CampaignStatus,
  userId: z.string(),
  sentAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type Campaign = z.infer<typeof Campaign>;

export const CreateCampaignInput = z.object({
  name: z.string().min(1, "Name is required"),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(1, "Description is required"),
});


export const CreateCampaignResponse = z.object({
  code: z.number(),
  message: z.string(),
  response: Campaign.nullable(),
});


export const GetCampaignByIdRequest  = z.object({
  id: z.string(),
});

export const GetCampaignsRequest = z.object({
  userId: z.string(),
});
