const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const { sendCookie, destroyCookie } = require("../utils/cookie.js");
const Errorhandler = require("../utils/errorhandler.js");
const respond = require("../utils/jsonresponse.js");

// const homepage = (req, res) => {
//     try {
//         respond(res, 200, `Welcome, ${req.user.username}.`);
//     } catch (error) {
//         next(error);
//     }
// }

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return next(new Errorhandler("User already exists", 400));
        const hashedpassword = await bcrypt.hash(password, 10);
        user = await new User({ username, email, password: hashedpassword });
        user.save();
        sendCookie(user, res);
        respond(res,200,"Registered successfully");
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password="" } = req.body;
        const user = await User.findOne({ email });
        if (!user) return next(new Errorhandler("User not found.", 404));
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new Errorhandler("Invalid password", 400));
        sendCookie(user, res);
        respond(res,200,"Logged In successfully");
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res) => {
    try {
        destroyCookie(res);
        respond(res, 200, "logged Out successfully");
    } catch (error) {
        next(error);
    }
}


module.exports = {  register, login, logout };