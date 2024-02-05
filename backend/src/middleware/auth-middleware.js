import jwt from "jsonwebtoken";
import { ResponseError } from "../error/response-error";

export const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers; // destructuring athorizatio from headers
    if (!authorization) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    } else {
        const token = authorization.split(" ")[1]; // mengambil data token dari bearer token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET); // decode token
            req.user = payload; // buat data req.user dari payload tokennya
        } catch (e) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        }
        next();
    }

}