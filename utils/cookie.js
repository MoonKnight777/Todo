const jwt = require("jsonwebtoken");


function sendCookie(userdata, res) {
    const token = jwt.sign({ _id: userdata._id }, process.env.JWT_SECRET);
    res
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "development" ? "none" : "lax",
            secure: process.env.NODE_ENV === "development" ? true : false
        })
}

function destroyCookie(res) {
    res.cookie("token", null, {
        maxAge: 0
    });
}

module.exports = { sendCookie, destroyCookie };