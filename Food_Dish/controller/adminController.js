
import modelUser from "../model/UserModel.js";
import HttpError from "../middleware/HttpError.js";

const getAllUsers = async (req,res,next)=>{
    try {
        const {Role,isVerified} =req.query;

        const Query = {};

        if(Role === "provider"){
            Query.Role=Role;
        }

        if(Role === "customer"){
            Query.Role = Role;
        }

        if(isVerified != undefined){
            Query.isVerified = isVerified = "true";
        }

        const users = await modelUser.find(Query)

        if(users.length === 0){
            return next(new HttpError("user data not found",404));
        }

        const totalUsers = await modelUser.countDocuments(Query);

        res.status(201).json({
            success:true,
            message:"user data found",
            totalUsers,
            users
        })
    } catch (error) {
        return next (new HttpError(error.message));
    }
}

export default {getAllUsers}