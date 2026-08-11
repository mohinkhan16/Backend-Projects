import ProviderModel from "../model/ProviderModel.js";
import UserModel from "../model/UserModel.js";
import HttpError from "../middleware/HttpError.js";
import { getWelcomeEmailTemplate } from "../services/emailTemplate.js";
import sendEmail from "../utils/sendEmail.js";

const resgisterAsprovider = async (req, res, next) => {
  try {
    const userId = req.User._id;

    const user = await UserModel.findById(userId);

    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    const existingProvider = await ProviderModel.findOne({
      providerName: userId,
    });

    if (existingProvider) {
      return next(new HttpError("Provider already registered", 400));
    }

    const { resturantName, bankNumber } = req.body;

    const newProvider = new ProviderModel({
      providerName: userId,
      resturantName,
      bankNumber,
      document: req.file?.path || null,
      Cloudinary_Id: req.file?.filename || null,
    });

    user.Role = "provider";
    await user.save();

    await newProvider.save();

    await sendEmail({
      to:user.Email,
      subject:"Welcome to Food_Dish - Provider Account",
      html:getWelcomeEmailTemplate(user.Name,"provider")
    })

    const provider = await ProviderModel.findById(newProvider._id)
      .populate("providerName", "Name Email Address ")
      .populate("resturantName");

    res.status(201).json({
      success: true,
      message: "New Provider Added",
      provider,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


const updateProvider = async (req,res,next)=>{
  try {
    const {id}=req.params;

    const {restaurantName,bankNumber} = req.body;

    const provider = await ProviderModel.findById(id);

    if(!provider){
      return next(new HttpError("provider not found",404))
    }

    if(restaurantName){
      provider.restaurantName = resturantName ;
    }

    if(bankNumber){
      provider.bankNumber = bankNumber;
    }

    if(req.file && req.files.length > 0){
      provider.document = req.files.map((file)=>file.path);
      provider.cloudinary_Id = req.files.map((file)=>file.filename);
    }

    await provider.save();

    const updateProvider = await ProviderModel.findById(id)
    .populate("providerName","Name Email");

    res.status(200).json({
      success:true,
      message:"Provider update successfully",
      provider:updateProvider,
    })
  } catch (error) {
    next(new HttpError(error.message,500));
  }
};

const deleteProvider = async (req,res,next)=>{
  try {
    const {id}=req.params;

    const provider = await ProviderModel.findById(id);

    if(!provider){
      return next(new HttpError("provider not found",404));
    }

    await ProviderModel.findByIdAndDelete(id);

    res.status(200).json({
      success:true,
      message:"Provider delete successfully",
    })
  } catch (error) {
    next(new HttpError(error.message,500))
  }
} 
export default { resgisterAsprovider,updateProvider,deleteProvider};