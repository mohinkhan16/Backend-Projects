
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!value.toLowerCase()==="password"){
                throw new Error("password cant be password")
            }
        }
    },
    phone:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
        enum:["user","Admin"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
},{
    timestamps: true
});

const User=mongoose.model("user",userSchema);
export default User;