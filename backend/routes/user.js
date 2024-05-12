const express= require("express")
const userRouter = express.Router()

userRouter.get('/use',(req,res) => {
    res.json('hello user')
})

module.exports = userRouter;