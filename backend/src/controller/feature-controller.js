import featureService from "../service/feature-service.js"

// const summarize = async (req, res, next) => {
//     try {
//         const result = await featureService.summarizer(req.body);
//         res.status(200).json({
//             data : result
//         });
//     } catch (e) {
//         next(e)
//     }
// }

const parse = async (req, res, next) => {
    try {
        const result = await featureService.parser(req);
        res.status(200).json({
            data : result
        });
    } catch (e) {
        next(e)
    }
}

const caption = async (req,res,next) => {
    try {
        const result = await featureService.captionScrap(req.body.videoId);
        res.status(200).json({
            data : result
        });
    } catch (e) {
        next(e);
    }
}



export default {
    // summarize,
    parse,
    caption
}