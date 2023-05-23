const jwt = require("jsonwebtoken");

const auth = function(req, res, next) {
    try {
        //check the token in request header
        let token = req.headers["x-Auth-Token"];
        if(!token) {
            token = req.headers["x-auth-token"];
        }
        
        if(!token) {
            return res.status(401).send({ 
                status: false, 
                msg: "token must be present!" 
            });
        }
        
        //validate this token
        let decodedToken = jwt.verify(token, "vipul-secret-key");
        if(!decodedToken){
            return res.status(401).send({ 
                status: false, 
                msg: "Invalid token" 
            });
        }
        
        // comapre the logged in user's id and the id in request
        let userToBeModified = req.params.userId;
        let userLoggedIn = decodedToken.userId;

        if(userLoggedIn != userToBeModified) {
            return res.status(403).send({ 
                status: false, 
                msg: "User logged in is not allowed to modify requested user data!" 
            });
        }

        next()
    } catch (err) {
        res.status(500).send({ 
            status: false, 
            msg: err.message 
        });
    }
}

module.exports.auth = auth