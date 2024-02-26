import Joi from "joi";

export const youtubeUrlValidation = Joi.object({
    message :  Joi.string().required().min(1)
});