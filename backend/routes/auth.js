const express= require("express")
const authRouter = express.Router()

const {signup,login,logout,isLoggedin} = require('../Controllers/Auth')

authRouter.post('/signup',signup)
authRouter.post('/login',login)
authRouter.post('/logout',logout)
authRouter.get('/isLoggedin',isLoggedin)

module.exports = authRouter;