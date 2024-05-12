const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.checkAuth = (req,res,next) => {
    try {
        // extract jwt token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","")

        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Token Missing',
            })
        }

        // verify the token
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decode;

        } catch (error) {
            return res.status(401).json({
                successs:false,
                message: 'token is invalid'
            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            successs:false,
            message: 'Something went wrong while verifying the token'
        })
    }
}