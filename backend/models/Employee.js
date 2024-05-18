const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        trim:true,
    },
    lastName:{
        type: String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    phn:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"],
        required:true
    },
    country:{
        type:String,
        required: true,
    },
    status:{
        type: String,
        enum:["Working","Resigned"],
        default:"Working"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Employee", employeSchema);