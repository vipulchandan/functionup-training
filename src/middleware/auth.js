const jwt = require("jsonwebtoken");

const authenticate = function(req, res, next) {
    try {
        //check the token in request header
        let token = req.headers["x-Auth-Token"];
        if(!token) {
            token = req.headers["x-auth-token"];
        }
        
        if(!token) {
            return res.status(401).json({ status: false, msg: "token must be present!" });
        }
        
        //validate this token
        let decodedToken = jwt.verify(token, "vipul-secret-key");
        if(!decodedToken){
            return res.status(401).json({ status: false, msg: "Invalid token" });
        }

        next();

    } catch(err) {
        res.status(500).json({ status: false, msg: err.message });
    }
}


const authorise = function(req, res, next) {
    try {
        //check the token in request header
        let token = req.headers["x-Auth-Token"];
        if(!token) {
            token = req.headers["x-auth-token"];
        }
        
        if(!token) {
            return res.status(401).json({ status: false, msg: "token must be present!" });
        }
        
        //validate this token
        let decodedToken = jwt.verify(token, "vipul-secret-key");
        if(!decodedToken){
            return res.status(401).json({ status: false, msg: "Invalid token" });
        }
        
        // comapre the logged in user's id and the id in request
        let userToBeModified = req.params.userId;

        let userLoggedIn = decodedToken.userId;

        if(userLoggedIn != userToBeModified) {
            return res.status(403).json({ status: false, msg: "User logged in is not allowed to modify requested user data!" });
        }

        next()
    } catch (err) {
        res.status(500).json({ status: false, msg: err.message });
    }
}

module.exports = { authenticate, authorise }