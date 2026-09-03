import User from "../model/user.model.js";
import HttpError from "../middleWare/HttpError.js";

//for user add
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


//for user login
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

//authlogin
const AuthLogin = async (req,res,next)=>{
    const user = req.user;
    
    res.status(200).json({
        success:true,
        message:"auth login successfully"
    })
}


//for user logout
const logout = async (req,res,next)=>{
    try {
        req.user.tokens = req.user.tokens.filter((t)=>
        t.token !== req.token);

        await req.user.save();

        res.status(200).json({
            success:true,
            message:"User logout successfully"
        })
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}

//for user logout from all device
const logoutAll = async (req,res,next)=>{
    try {
        req.user.tokens = [];

        await req.user.save();

        res.status(200).json({
            success:true,
            message:"user logged out from All devices successfully"
        });
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}

///to get all user
const GetAll = async(req,res,next)=>{
  try {
    const users =await User.find({});

    if(!users){
        return next(new HttpError("user not found"));
    }

    res.status(200).json({
        success:true,
        message:"All data found successfully",
        users
    })
  } catch (error) {
    next(new HttpError(error.message,500))
  }
}

//for delete user
const Deleteuser = async(req,res,next)=>{
    try {
        const user = req.user;

        if(!user){
            return next(new HttpError("user not found",404))
        }

        await user.deleteOne();

        res.status(200).json({
            success:true,
            message:"user deleted successfully"
        });
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}

//for update user
const UpdateUser = async (req,res,next)=>{
    try {
        const user = req.user;

        if(!user){
            return next(new HttpError("No user found",404));
        }

        const update = Object.keys(req.body);

        const allowedfields = ["Name","Email","Address"];

        const isValid = update.every((feild)=>
        allowedfields.includes(feild));

        if(!isValid){
            return next(new HttpError("only allowed feild can be update"));
        }

        update.forEach((field)=>{
            user[field]= req.body[field];
        });

        await user.save();

        res.status(200).json({
            success:true,
            message:"user updated successfully",
            user
        });
    } catch (error) {
        next(new HttpError(error.message,500))
    }
}

export default {Add,login,logout,logoutAll,AuthLogin
    ,GetAll,Deleteuser,UpdateUser};