const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
    name:{
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
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},{timestamps:true})

module.exports = mongoose.model("Employee", employeSchema);