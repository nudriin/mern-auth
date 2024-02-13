import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await userService.userRegister(request);
        res.status(200).json({
            data : result
        });
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await userService.userLogin(request);
        
        // response cookie
        res.status(200).json({
            data : result
        });
        // const expired = 60 * 60 * 1000;
        // cookie("access_token", result.token, {
        //     maxAge : expired,
        //     httpOnly : true
        // }).
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
        
        res.status(200).json({
            data : result
        });
        // const expired = 60 * 60 * 1000;
        // .cookie("access_token", result.token, {
        //     maxAge : expired,
        //     httpOnly : true
        // })

    } catch (e) {
        next(e)
    }
}

const get = async(req, res, next) => {
    try {
        const username = req.user.username;

        const result = await userService.userGet(username);
        res.status(200).json({
            data : result
        });
    } catch (e) {
        next(e);
    }
}


const update = async(req, res, next) => {
    try{
        const request = req.body;

        const result = await userService.userUpdate(request);
        res.status(200).json({
            data : result
        });
    } catch(e) {
        next(e);
    }
}

export default {
    register,
    login,
    googleAuth,
    get,
    update
}