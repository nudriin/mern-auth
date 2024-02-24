import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import openAiController from "../controller/openAi-controller.js";

export const userRouter = express.Router();
userRouter.use(authMiddleware);

userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);

userRouter.post("/api/summarize/youtube", openAiController.summarize);
userRouter.post("/api/summarize/pdf", openAiController.parse);