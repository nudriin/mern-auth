import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { userRegisterValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validate.js";
import bcrypt from "bcrypt";


const userRegister = async (request) => {
    const user = validate(userRegisterValidation, request);

    const userCount = await prismaClient.user.count({
        where : {
            username : user.username
        }
    });

    const emailCount = await prismaClient.user.count({
        where : {
            email : user.email
        }
    });

    if(userCount === 1) {
        throw new ResponseError(400, "Username is already exist")
    }

    if(emailCount === 1) {
        throw new ResponseError(400, "Email is already exist")
    }

    user.password = await bcrypt.hash(user.password, 10);

    const result = await prismaClient.user.create({
        data : user,
        select : {
            username : true,
            email : true,
            name : true
        }
    });

    return result;
}

export default {
    userRegister
}