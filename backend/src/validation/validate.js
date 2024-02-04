import { ResponseError } from "../error/response-error.js";

export const validate = (schema, request) => {
    const result = schema.validate(request,{
        abortEarly: false,  // include all errors
        allowUnknown :false // throw error if unknown properties are present
    });

    if(result.error) {
        throw new ResponseError(400, result.error.message); //  Bad Request
    } else {
        return result.value; //  valid data
    }
}