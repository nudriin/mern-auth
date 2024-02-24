import { openAi } from "../app/openAi.js"
import PDF from "pdf-parse/lib/pdf-parse.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validate.js";
import { youtubeUrlValidation } from "../validation/open-ai-validation.js";

const summarizer = async (request) => {
    const requestValid = validate(youtubeUrlValidation, request);
    const longMessage = `Summarize the following text to Indonesian and provide a response that covers approximately 75% of the summary. Text : ${requestValid}`
    const message = longMessage.substring(0, 16380); // batasin hanya sampai 16385 karakter
    const completion = await openAi?.chat?.completions?.create({
        messages: [{
            role: "user",
            content: message
        }],
        model: "gpt-3.5-turbo",
        max_tokens : 4096
    });

    return {
        message : completion?.choices[0]?.message?.content
    }

}

const parser = async (requets) => {
    if(!requets.files) {
        throw new ResponseError(400, "No file provided");
    }
    
    const data = await PDF(requets.files.pdfFile);
    const longMessage = `Summarize the following text to Indonesian and provide a response that covers approximately 75% of the summary. Text : ${data.text}`
    const message = longMessage.substring(0, 16380); // batasin hanya sampai 16385 karakter
    
    const completion = await openAi?.chat?.completions?.create({
        messages: [{
            role: "user",
            content: message
        }],
        model: "gpt-3.5-turbo",
        max_tokens : 4096
    });

    return {
        message : completion?.choices[0]?.message?.content
    }
}

export default {
    summarizer,
    parser
}