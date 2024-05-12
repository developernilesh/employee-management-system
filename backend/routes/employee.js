const express= require("express")
const employeeRouter = express.Router()

employeeRouter.get('/em',(req,res) => {
    res.json('hello employee')
})

module.exports = employeeRouter;