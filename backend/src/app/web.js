import express from "express";
import cors from "cors";
import { errorMiddleware } from "../middleware/error-middleware";

export const web = express();
web.use(express.json());
web.use(cors({
    origin : true
}));

web.use(errorMiddleware);