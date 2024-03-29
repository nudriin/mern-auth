import Joi from "joi";

// username String @id @db.VarChar(100)
//   email String @db.VarChar(100) @unique
//   password String @db.VarChar(100)
//   name String @db.VarChar(100)
export const userRegisterValidation = Joi.object({
    username : Joi.string().max(100).required(),
    email : Joi.string().max(100).email().required(),
    password : Joi.string().max(100).min(8).required(),
    name : Joi.string().max(100).required(),
    profile_pic: Joi.string().optional()
});

export const userLoginValidation = Joi.object({
    username : Joi.string().max(100).required(),
    password : Joi.string().max(100).min(8).required()
});

export const userGetValidation = Joi.string().max(100).required();

export const userUpdateValidation = Joi.object({
    username : Joi.string().max(100).required(),
    password : Joi.string().max(100).min(8).optional(),
    old_password : Joi.string().max(100).min(8).optional(),
    name : Joi.string().max(100).optional(),
    profile_pic: Joi.string().optional()
});