const jwt = require('jsonwebtoken')
require("dotenv").config()


exports.authUser = (req, res, next) => {
    let token = req.headers.apikey;
    if (!token) {
        return res.json({ msg: "you need to sent token for this end pint" })
    }
    try {
        let tokenPayload = jwt.verify(token, process.env.SECRET_KEY);
        req.tokenPayload = tokenPayload;
        next()
    }
    catch {
        return res.json({ msg: "token invalid or exparied" })
    }

}
exports.authAdmin = (req, res, next) => {
    let token = req.headers.apikey;
    if (!token) {
        return res.json({ msg: "you need to sent token for this end pint" })
    }
    try {
        let tokenPayload = jwt.verify(token, process.env.SECRET_KEY);
        req.tokenPayload = tokenPayload;
        if (tokenPayload.role == "admin") {
            next()
        }
        else {
            return res.json({ msg: "you must be admin" })
        }
    }
    catch {
        return res.json({ msg: "token invalid or exparied" })
    }

}   