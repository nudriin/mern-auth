import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await userService.userRegister(request);
        res.status(200).json({
            data : result
        })
    } catch (e) {
        next(e)
    }
}

export default {
    register
}