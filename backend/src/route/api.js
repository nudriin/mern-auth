import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import featureController from "../controller/feature-controller.js";

export const userRouter = express.Router();
userRouter.use(authMiddleware);

userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/current/delete", userController.remove);

// userRouter.post("/api/summarize/youtube", featureController.summarize);
userRouter.post("/api/summarize/pdf", featureController.parse);

userRouter.post("/api/caption/youtube", featureController.caption);