
import User from '../models/user.model.js';

import HttpError from "../middleware/HttpError.js";

const add = async (req,res,next)=>{
    try {
        const {name,email,password,phone,role}= req.body;

        const newUser = await User({
            name,
            email,
            password,
            phone,
            role
        });

        await newUser.save();

        res.status(201).json({
            succeess:true,
            message:"user added successfully",
            newUser
        })
    } catch (error) {
        next (new HttpError(error.message,500))
    }
}

const getAll = async (req, res, next) => {
  try {
    const users = await User.find({});

    if(!users){
      return next(new HttpError("user not found"));
    }

    res.status(200).json({
      success: true,
      message: "All data found successfully",
      users,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const login = async (req,res,next)=>{
    try {
        const {email,password}=req.body;
        
        const user = await User.findByCredential(email,password); 
    
        if(!user){
            return next(new HttpError("Enable to login"));
        }

        const token = await user.generatAuthToken();

        res.status(200).json({
            succeess:true,
            message:"user login successfully",

            user,
            token
        })
    } catch (error) {
        next(new HttpError(error.message,500));
    }
};

const authLogin = async (req,res,next)=>{
    const user = req.user;

    res.status(200).json({
        success:true,
        message:"auth login successfully"
    })
}
const logout = async (req,res,next)=>{
    try {
        const user = req.user;

        user.tokens = user.tokens.filter((t)=> t.token != req.token);

        await user.save();

        res.status(200).json({
            success:true,
            message:"user logot successfully"
        })
    } catch (error) {
        next(new HttpError(error.message));
    }
}
const logoutAll = async (req,res,next)=>{
    try {
        req.user.token=[];

        await req.user.save();

        res.status(200).json({
            success:true,
            message:"user logout all from all device"
        });
    } catch (error) {
        next(new HttpError(error.message));
    }
}
export default{add,login,getAll,authLogin}