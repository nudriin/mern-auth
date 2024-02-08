import jwt from "jsonwebtoken";
import { prismaClient } from "../app/database.js";

export const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers; // destructuring athorizatio from headers
    if (!authorization) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    } else {
        try {
            const token = authorization.split(" ")[1]; // mengambil data token dari bearer token
            const payload = jwt.verify(token, process.env.JWT_SECRET); // decode token
            const user = await prismaClient.user.findUnique({
                where : {
                    username : payload.username
                },
                select : {
                    username : true,
                    email : true,
                    name : true,
                    profile_pic : true
                }
            });
            if(!user){
                res.status(401).json({
                    errors: "Unauthorized"
                }).end();
            } else {
                req.user = user; // buat data req.user
                next();
            }
        } catch (e) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        }
    }

}