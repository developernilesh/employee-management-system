const Employee = require('../models/Employee')

exports.createEmployee = async(req,res) => {
    try {
        const {name,email,phn,gender} = req.body

        if(!name || !email || !phn || !gender){
            return res.status(401).json({
                success:false,
                meassage:"Please fill all the details"
            })
        }

        const employee = await Employee.create({
            name,email,phn,gender
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
        const allEmployees = await Employee.find({})

        if(!allEmployees){
            return res.status(401).json({
                success:false,
                message:"Error while fetching employees"
            })
        }

        return res.status(200).json({
            success:true,
            allEmployees
        })

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

        const currentUserEmployees = await Employee.find({})
        console.log(currentUserEmployees);

        if(!currentUserEmployees){
            return res.status(401).json({
                success:false,
                message:"Error while fetching employees"
            })
        }

        return res.status(200).json({
            success:true,
            currentUserEmployees
        })
        
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

        return res.status(200).json({
            success:true,
            message:"Employee updated succesfully",
            updatedEmployee
        })
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:'Cannot update Employee',
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