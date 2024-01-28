const user = require("../models/user.js");
const jwt = require("jsonwebtoken");

async function isAuthenticated(req, res, next) {

    const { token } = req.cookies
    if (!token)
        return res.status(400).json({
            success: false,
            message: "Login first."
        });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userdata = await user.findOne({ _id: decoded._id });
    if (!userdata) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: User not found"
        });
    };
    req.user = userdata;
    next();

}

module.exports = isAuthenticated;