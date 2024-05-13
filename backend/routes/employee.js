const express= require("express")
const employeeRouter = express.Router()

const {createEmployee,getEmployees,updateEmployee,deleteEmployee,getCurrentUserEmployees} = require('../Controllers/ManageEmp')

employeeRouter.post('/addEmployee',createEmployee)
employeeRouter.get('/seeEmployees',getEmployees)
employeeRouter.get('/currentUserEmployees',getCurrentUserEmployees)
employeeRouter.put('/updateEmployee/:id',updateEmployee)
employeeRouter.delete('/deleteEmployee/:id',deleteEmployee)

module.exports = employeeRouter;