
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    Password:{
        type:String,
        required:true,
        minlength:6
    },
    Address:{
        type:String,
        required:true,
    },
    Phone:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})