const express= require("express")
const router = express.Router()

const employeeRouter = require('./employee')
const authRouter = require('./auth')
const userRouter = require('./user')
const {checkAuth} = require('../Middlewares/checkAuth')

router.use('/auth', authRouter)
router.use('/employee',checkAuth, employeeRouter)
router.use('/user',checkAuth, userRouter)

module.exports = router;