import express from "express";
import cors from "cors";
import { userRouter } from "./routers/userRouter";
import { clerkMiddleware } from '@clerk/express'
import { clerkWebhookRouter } from "./routers/clerkWebhookRouter";
import 'dotenv/config'
import { campaignRouter } from "./routers/campaignRouter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

app.use("/api/users", userRouter);
app.use("/api/webhooks", clerkWebhookRouter);
app.use("/api/campaigns", campaignRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
