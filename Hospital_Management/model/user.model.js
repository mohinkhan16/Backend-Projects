
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from  "bcryptjs";

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
    },
    tokens:[
        {
            token:{
                type:String,
                requried:true,
            },
        },
    ],
},{
    timestamps:true
});

//Hasing Password
userSchema.pre("save", async function(){
    const user = this;
    if(user.isModified("Password")){
        user.Password = await bcrypt.hash(user.Password,10);
    }
});

//Find user for login

userSchema.statics.findByCredential = async function (Email,password){
    try {
        const users = await this.findOne({Email});

        if(!user){
            throw new Error("unable to login");
        }

        const isMatched = await bcrypt.compare(Password,users.password);

        if(!isMatched){
            throw new Error("unable to login");
        }
        return users;

    } catch (error) {
        throw new Error(error.message)
    }
};

//Generate AuthToken

userSchema.methods.generateAuthToken = async function() {
    try {
        const user = this;

        const token = jwt.sign(
            {_id:user._id.toString()},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        if(!token){
            throw new Error("failed to generate Auth token");
        }
        user.tokens = user.tokens.concat({token});

        await user.save();
        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};

userSchema.methods.toJSON = function (){
    const user = this;

    const userObject = user.toObject();

    delete userObject.Password;

    delete userObject.tokens;

    delete userObject.__v;

    delete userObject.createdAt;

    delete userObject.updateAt;

    return userObject;
}

const modelUser = mongoose.model("user",userSchema);

export default modelUser;