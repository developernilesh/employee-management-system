const bcrypt = require("bcrypt");
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.signup = async(req,res) => {
    try {
        // get data
        const {name,email,password} = req.body;
        // check if user already exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already exists',
            })
        }

        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10)
        } 
        catch (error) {
            return res.status(500).json({
                success:false,
                message:'Error hashing password'
            })
        }

        // create database entry for user
        const user = await User.create({
            name,email,password:hashedPassword
        })  

        return res.status(200).json({
            success:true,
            message:'User created successfully',
            data:user,
        })
    } 
    catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:'User cannot be registered,  please try again later',
        })
    }
} 


exports.login = async(req,res) => {
    try {
        // validation for email and password
        const {email,password} = req.body

        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:'Please fill all the details'
            })
        }

        // check if user is already logged in
        const token = req.cookies.token

        if(token){
            const isVerified = jwt.verify(token,process.env.JWT_SECRET)
            if(isVerified){
                return res.status(401).json({
                    success:false,
                    message: 'User is already Logged In'
                })
            }
        }

        // check for registered user
        let user = await User.findOne({email})

        if(!user){
            return res.status(401).json({
                success:false,
                message:'User is not registered, please check your email'
            })
        }

        // verify password and generate a JWT token
        const payload = {
            name:user.name,
            email:user.email,
            id:user._id,
        }
        if(await bcrypt.compare(password, user.password)){
            // password matches
            let token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn:'24h',
                }
            )
            
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            
            const options = {
                expires: new Date(Date.now() + 24*60*60*1000),
                httpOnly:true,
                secure: true,
                sameSite: 'None',
                path: '/' 
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:'User logged in successfully'
            })
        }
        else{
            // password do not match
            return res.status(403).json({
                success:false,
                message:'You have entered incorrect password'
            })
        }
    } 
    catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message:'Login failure'
        })
    }
}

exports.logout = async(req,res) => {
    try {
        const options = {
            expires: new Date(Date.now()+1),
            httpOnly:true,
            secure: true,
            sameSite: 'None',
            path: '/' 
        }

        res.cookie("token",'',options).status(200).json({
            success: true,
            message: "Logged Out Successfully"
        });
        
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            "success":false,
            "message":"Logout Error"
        })
    }
}

exports.isLoggedin = async(req,res) => {
    try {
        const token = req.cookies.token
        
        if(!token){
            return res.json({
                success:false,
                "message": "cannot get token",
            })
        }

        const secret = process.env.JWT_SECRET

        const isVerified = jwt.verify(token,secret)
        
        if(!isVerified){
            return res.json({
                success: false,
                "message":"cannot get isVerified",
                "token": token,
            })
        }
        return res.json({
            success: true,
            "isVerified": isVerified,
        })

    } catch (error) {
        console.error(error)
        return res.status(401).json({
            "success":false,
            "message":"Logged In verification error"
        })
    }
}