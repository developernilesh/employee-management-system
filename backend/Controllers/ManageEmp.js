const Employee = require('../models/Employee')

exports.createEmployee = async(req,res) => {
    try {
        const {firstName,lastName,email,phn,gender,country,status} = req.body

        if(!firstName || !lastName || !email || !phn || !gender || !country || !status){
            return res.status(401).json({
                success:false,
                message:"Please fill all the details"
            })
        }

        if(phn.toString().length < 10){
            return res.status(401).json({
                success:false,
                message:"Phone no should contain at least 10 digits"
            })
        }

        const existingMail = await Employee.findOne({email})

        if(existingMail){
            return res.status(400).json({
                success:false,
                message:'Email already exists',
            })
        }

        const existingPhn = await Employee.findOne({phn})

        if(existingPhn){
            return res.status(400).json({
                success:false,
                message:'Phone no already exists',
            })
        }

        const employee = await Employee.create({
            firstName,lastName,email,
            phn,gender,country,status,user:req.user.id
        })

        return res.status(200).json({
            success:true,
            message:'Employee added successfully',
            data:employee,
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:'Error while adding employee details',
        })
    }
}

exports.getEmployees = async(req,res) => {
    try {
        const allEmployees = await Employee.find().sort({createdAt: -1})

        if(!allEmployees){
            return res.status(401).json({
                success:false,
                message:"Error while fetching employees"
            })
        }

        return res.status(200).json(allEmployees)

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:'Employees Not found',
        })
    }
}

exports.getCurrentUserEmployees = async(req,res) => {
    try {
        const userId = req.user.id

        if(!userId){
            return res.status(401).json({
                success:false,
                message:"Can't get User Id"
            })
        }

        const currentUserEmployees = await Employee.find({user:req.user.id}).sort({createdAt: -1})

        if(!currentUserEmployees){
            return res.status(401).json({
                success:false,
                message:"Error while fetching employees"
            })
        }

        return res.status(200).json(currentUserEmployees)
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:'Employees Not found',
        })
    }
}

exports.updateEmployee = async(req,res) => {
    try {
        const employeeId = req.params.id

        if(!employeeId){
            return res.status(401).json({
                success:false,
                message:"Can't get Employee Id"
            })
        }

        const verifiedEmployee = await Employee.findById(employeeId).exec()

        if(!verifiedEmployee){
            return res.status(401).json({
                success:false,
                message:"No employee found"
            })
        }

        if(verifiedEmployee.user.toString() !== req.user.id){
            return res.status(401).json({
                success:false,
                message:"It is not the employee added by the user"
            })
        }

        if(req.body.phn.toString().length < 10){
            return res.status(401).json({
                success:false,
                message:"Phone no should contain at least 10 digits"
            })
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            req.body,
            {new:true}
        )

        if(!updatedEmployee){
            return res.status(401).json({
                success:false,
                message:"Employee not found"
            })
        }

        return res.status(200).json(updatedEmployee)
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.deleteEmployee = async(req,res) => {
    try {
        const employeeId = req.params.id

        if(!employeeId){
            return res.status(401).json({
                success:false,
                message:"Can't get Employee Id"
            })
        }

        const verifiedEmployee = await Employee.findById(employeeId).exec()

        if(!verifiedEmployee){
            return res.status(401).json({
                success:false,
                message:"No employee found"
            })
        }

        if(verifiedEmployee.user.toString() !== req.user.id){
            return res.status(401).json({
                success:false,
                message:"It is not the employee added by the user"
            })
        }

        const deletedEmployee = await Employee.findByIdAndDelete(employeeId)

        if(!deletedEmployee){
            return res.status(401).json({
                success:false,
                message:"Employee not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Employee deleted succesfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:'Cannot delete Employee',
        })
    }
}