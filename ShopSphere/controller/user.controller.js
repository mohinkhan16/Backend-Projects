
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

export default{add,login,getAll}