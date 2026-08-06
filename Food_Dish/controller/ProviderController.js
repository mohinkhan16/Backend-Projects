import ProviderModel from "../model/ProviderModel.js";
import UserModel from "../model/UserModel.js";
import HttpError from "../middleware/HttpError.js";

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

    const provider = await ProviderModel.findById(newProvider._id)
      .populate("providerName", "Name Email")
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

export default { resgisterAsprovider };