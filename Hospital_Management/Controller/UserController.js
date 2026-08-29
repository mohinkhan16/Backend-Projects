import User from "../model/user.model.js";
import HttpError from "../middleWare/HttpError.js";

const Add = async (req,res,next)=>{
    try {
        const {
            Name,
            Email,
            Password,
            Address,
            Phone
        }=req.body;

        const newUser = await User({
           Name,
            Email,
            Password,
            Address,
            Phone 
        })

        await newUser.save();
        res.status(201).json({
            success:true,
            message:"new USer added successfully",newUser
        })
    } catch (error) {
        console.log(error);
        next(new HttpError(error.message,500))
        
    }
}

const getAll = async (req,res,next)=>{
};

const login = async(req,res,next)=>{
    try {
        const {Email,Password} = req.body;

        const user = await User.findByCredential(Email,Password);

        if(!user){
            return next(new HttpError("unable to login"));
        }

        const token = await user.generateAuthToken();

        res.status(200).json({
            success:true,
            message:"user logged in successfully",
            user,
            token
        })
    } catch (error) {
        next (new HttpError(error.message,500));
    }
}

const AuthLogin = async (req,res,next)=>{
    const user = req.user;
    
    res.status(200).json({
        success:true,
        message:"auth login successfully"
    })
}

export default {Add,login,AuthLogin};