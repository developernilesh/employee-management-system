const express= require("express")
const userRouter = express.Router()

const {getUserInfo,updateUser} = require('../Controllers/Users')

userRouter.get('/info',getUserInfo)
userRouter.put('/updateUser',updateUser)

module.exports = userRouter;