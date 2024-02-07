import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await userService.userRegister(request);
        res.status(200).json({
            data : result
        });
        res.cookies
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await userService.userLogin(request);
        const expired = 60 * 60 * 1000;

        // response cookie
        res.status(200).cookie("access_token", result.token, {
            maxAge : expired,
            httpOnly : true
        }).json({
            data : result
        });
    } catch (e) {
        next(e);
    }
}

const googleAuth = async (req, res, next) => {
    try {
        const request = req.body;
        request.password = Math.random().toString(36).slice(-8); // buat password random yang akan dikonversi ke string random dan tidak lebih dari 8 karakter
        
        // register via google
        const result = await userService.userGoogleAuth(request);
        
        const expired = 60 * 60 * 1000;
        res.status(200).cookie("access_token", result.token, {
            maxAge : expired,
            httpOnly : true
        }).json({
            data : result
        });

    } catch (e) {
        next(e)
    }
}

export default {
    register,
    login,
    googleAuth
}