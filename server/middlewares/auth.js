const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.send("Token is required for authentication");

    }
    else {
        try {
            var decoded = jwt.verify(token, 'secretkey');
            // console.log(decoded);
            return next();
        } catch (err) {
            return res.send("Invalid token!");
        }
    }
}


module.exports =  verifyToken;