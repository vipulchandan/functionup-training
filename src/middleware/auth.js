const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authenticateUser = (req, res, next) => {
    try {
        let token = req.headers["x-Auth-Token"];
        if(!token) {
        token = req.headers["x-auth-token"];
        }

        if(!token) {
        return res.status(500).json({ status: false, msg: "token must be present!" });
        }

        let decodedToken = jwt.verify(token, "vipul-secret-key");
        if(!decodedToken){
        return res.status(500).json({ status: false, msg: "Invalid token" });
        }

        next();

    } catch(err) {
        res.status(500).json({ status: false, msg: err.message });
    }
}

module.exports.authenticateUser = authenticateUser