const jwt = require('jsonwebtoken');

const authGuard = async (req,res,next) => {
    const {authorization} = req.headers;

    try {

        const token = authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.jwt_secret);
        console.log(decode);
        const {username , userId} = decode;
        req.username = username;
        req.userId = userId;
        next()

    } catch {
        next("Authentication failed");
    }
}

module.exports = authGuard;