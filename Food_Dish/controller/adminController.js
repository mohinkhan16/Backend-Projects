
import User from "../model/UserModel.js";
import Provider from "../model/ProviderModel.js";
import Resturantent from "../model/RestaurantModel.js";
import Food from "../model/food.model.js";
import HttpError from "../middleware/HttpError.js";
import order from "../model/order.model.js";

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

        const users = await User.find(Query)

        if(users.length === 0){
            return next(new HttpError("user data not found",404));
        }

        const totalUsers = await User.countDocuments(Query);

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

const dashBoardStatics = async (req,res,next)=>{
    try {

        //user        
        const totalUsers= await User.countDocuments();

        //customer
        const totalCustomer = await User.countDocument({role :"customer"});

        //provider
        const totalProvider = await Provider.countDocument({role:"provider"});

        const totalApproveProvider = await Provider.countDocument({isVerified: true});

        const totalRejectProvider = await Provider.countDocument({isVerified:false});

        const totalPendingProvider = await Provider.countDocument({isVerified:false});

        //Resturant
        const totalResturant = await Resturantent.countDocument();

        const totalOpenResturant = await Resturantent.countDocument({isOpen:true});

        const totalCloseResturant = await Resturantent.countDocument({isOpen:false});

        const totalVerifyResturant = await Resturantent.countDocument({isVerified:true});

        const totalRejectResturant = await Resturantent.countDocument({isVerified:false});  

        //Food
        const totalFood = await Food.countDocument();

        const totalAvailableFood = await Food.countDocument({isAvailable:true});

        const totalUnavailableFood = await Food.countDocument({isAvailable:false});

        const totalVerifyFood = await Food.countDocuments({IsVerified:true});

        const totalRejectFood = await Food.countDocuments({IsVerified: false});

        const totalOrder = await order.countDocument();

        const totalRevenue = await order.aggregate([
            {
                $group:{
                    _id:nul,
                    revenue:{$sum:"$totalAmount"}
                },
            },
        ]);

        res.status(200).json({
            success:true,
            message:"dashboard statice successfully",
            totalUsers,
            totalCustomer,
            totalProvider,
            totalApproveProvider,
            totalPendingProvider,
            totalResturant,
            totalOpenResturant,
            totalCloseResturant,
            totalVerifyResturant,
            totalRejectResturant,
            totalFood,
            totalAvailableFood,
            totalUnavailableFood,
            totalVerifyFood,
            totalRejectFood
        })
    } catch (error) {
        next (new HttpError(error.message));
    }
}

export default {getAllUsers,dashBoardStatics}