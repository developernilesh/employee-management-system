const express= require("express")
const userRouter = express.Router()

const {getUserInfo,updateUser} = require('../Controllers/Users')

userRouter.get('/prof',getUserInfo)
userRouter.put('/prof',updateUser)

module.exports = userRouter;