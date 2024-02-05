import express from "express";
import cors from "cors";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../route/public-api.js";
import { userRouter } from "../route/api.js";

export const web = express();
web.use(express.json());
web.use(cors({
    origin : true
}));
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);