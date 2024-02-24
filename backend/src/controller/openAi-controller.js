import openaiService from "../service/openai-service.js"

const summarize = async (req, res, next) => {
    try {
        const result = await openaiService.summarizer(req.body);
        res.status(200).json({
            data : result
        });
    } catch (e) {
        next(e)
    }
}

const parse = async (req, res, next) => {
    try {
        const result = await openaiService.parser(req);
        res.status(200).json({
            data : result
        });
    } catch (e) {
        next(e)
    }
}



export default {
    summarize,
    parse
}