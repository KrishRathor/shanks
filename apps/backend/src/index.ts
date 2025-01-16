import express, { type Request, type Response, Router } from "express";
import cors from "cors";
import { userRouter } from "./routers/userRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
