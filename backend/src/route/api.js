import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";

export const userRouter = express.Router();
userRouter.use(authMiddleware);

userRouter.get("/api/users/current", userController.get);