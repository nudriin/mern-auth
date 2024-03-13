import { openAi } from "../app/openAi.js"
import PDF from "pdf-parse/lib/pdf-parse.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validate.js";
import { youtubeUrlValidation } from "../validation/feature-validation.js";
import { youtube } from "../app/youtube.js";
import { GoogleGenerativeAI } from "@google/generative-ai";


const summarizer = async (request) => {
    const requestValid = validate(youtubeUrlValidation, request);
    const longMessage = `Summarize the following text to Indonesian and provide a response that covers approximately 75% of the summary. Text : ${requestValid}`
    const message = longMessage.substring(0, 16380); // batasin hanya sampai 16385 karakter
    try {
        const completion = await openAi?.chat?.completions?.create({
            messages: [{
                role: "user",
                content: message
            }],
            model: "gpt-3.5-turbo",
            max_tokens: 4096
        });
        return {
            message: completion?.choices[0]?.message?.content
        }
    } catch (e) {
        throw e;
    }


}

const parser = async (requets) => {
    if (!requets.files) {
        throw new ResponseError(400, "No file provided");
    }

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const data = await PDF(requets.files.pdfFile);
    const longMessage = `Summarize the following text to Indonesian and provide a response that covers approximately 75% of the summary, extracting key information. Text : ${data.text}`
    const message = longMessage.substring(0, 16380); // batasin hanya sampai 16385 karakter

    try {
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();
        const clearTxt = text.replace(/\*\*/g, '').replace(/\*/g, '');
        return {
            message: clearTxt
        }
    } catch (e) {
        throw e;
    }

}

const captionScrap = async (videoId) => {
    try {
        const response = await youtube.captions.list({
            part: 'snippet',
            videoId: videoId,
            hl: 'id'
        });

        const captions = response.data.items;

        // Ambil teks subtitle untuk setiap caption
        const captionsWithText = await Promise.all(captions.map(async caption => {
            const textResponse = await youtube.captions.download({
                id: caption.id,
                tfmt: 'ttml' // Format teks subtitle, Anda bisa mengganti sesuai kebutuhan
            });

            // Tambahkan teks subtitle ke properti 'text' di objek caption
            caption.text = textResponse.data;
            return caption;
        }));
        return {
            caption: captionsWithText
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export default {
    summarizer,
    parser,
    captionScrap
}