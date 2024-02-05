import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";

export const userRouter = express.Router();
userRouter.use(authMiddleware);