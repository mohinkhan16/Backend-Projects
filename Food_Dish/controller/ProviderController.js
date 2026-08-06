import providerModel from "../model/ProviderModel.js";
import HttpError from "../middleware/HttpError.js";


const addProvider = async (req, res, next) => {
  try {
    const { providerName, restaurantName, bankNumber } = req.body;

    const newProvider = new providerModel({
      providerName,
      restaurantName,
      bankNumber,
      document: req.file?.path || null,
      Cloudinary_Id: req.file?.filename || null,
    });

    await newProvider.save();

    const provider = await providerModel
      .findById(newProvider._id)
      .populate("providerName", "Name Email")
      .populate(
        "restaurantName",
        "RestaurantName Address Phone city state"
      );

    res.status(201).json({
      success: true,
      message: "New provider added",
      provider,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


export default { addProvider };