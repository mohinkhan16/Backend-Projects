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

export default {Add}