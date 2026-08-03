
import mongoose from "mongoose"
import { useTransition } from "react";

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
//hash password

userSchema.pre("save",async function(){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,10);
    }
})

userSchema.statics.findByCredential= async function (email,password) {
    try {
        const users = await this.findOne({email});
        
        if(!users){
            throw new Error("unable to login");
        }

        const isMatched = await bcrypt.compare(password,users.password);

        if(!isMatched){
            throw new Error("unable to login");
        }

        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}

// userSchema.methods.generateAuthToken = async function(){
//     try {
//         const user = this;

//         const token = jwt.sign({
//             _id : user._.
//         })
//     } catch (error) {
        
//     }
// }

const User=mongoose.model("user",userSchema);
export default User;