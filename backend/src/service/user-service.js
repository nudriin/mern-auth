import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { userLoginValidation, userRegisterValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validate.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userRegister = async (request) => {
    const user = validate(userRegisterValidation, request);

    const userCount = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    const emailCount = await prismaClient.user.count({
        where: {
            email: user.email
        }
    });

    if (userCount === 1) {
        throw new ResponseError(400, "Username is already exist")
    }

    if (emailCount === 1) {
        throw new ResponseError(400, "Email is already exist")
    }

    user.password = await bcrypt.hash(user.password, 10);

    const result = await prismaClient.user.create({
        data: user,
        select: {
            username: true,
            email: true,
            name: true
        }
    });

    return result;
}

const userLogin = async (request) => {
    const validRequest = validate(userLoginValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: validRequest.username
        },
        select: {
            username: true,
            email: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(404, "Username or password is wrong");
    }

    const validPassword = await bcrypt.compare(validRequest.password, user.password);

    if (!validPassword) {
        throw new ResponseError(404, "Username or password is wrong");
    }

    // ! MEMBUAT JSON WEB TOKEN
    const token = jwt.sign({
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 // akan expired dalam 1 jam
    });

    // return sebagai object token
    return {
        token : token
    }
}

export default {
    userRegister,
    userLogin
}