

import User from '../models/user.model.js';

import HttpError from "../middleware/HttpError.js";

const add = async (req,res,next)=> {
    
    try {
        const {name,email,password,phone,role}=req.body;

        const newUser={
            name,
            email,
            password,
            phone,
            role
        };

        const alredyuser = await User.findOne({email});

        console.log("alredyuser",alredyuser);

        if(!alredyuser){
            return next (new HttpError("user alredy exits with this email-id"));
        }
        
        const user = new User(newUser);

        await user.save();

        res.status(200).json({success:true,message:"new user added suceessfully",user});
    } catch (error) {
        return next(new HttpError(error.message,500))
    }
}
export default{add}