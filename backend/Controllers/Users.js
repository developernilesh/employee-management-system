const User = require('../models/User')

exports.getUserInfo = async(req,res) => {
    try {
        const userData = await User.findById(req.user.id)
        return res.status(200).json(userData)

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:'Error while fetching User Info'
        })
    }
}

exports.updateUser = async(req,res) => {
    try {
        const id = req.user.id
        
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            req.body,
            {new:true}
        )
        
        return res.status(200).json(updatedUser)

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:'Error while updating user'
        })
    }
}