import foodModel from "../model/foodModel.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";

const addFood = async (req, res, next) => {
  try {
    const {
      name,
      price,
      owner,
      RestaurantName,
      description,
      preparingTime,
      category,
    } = req.body;

    const newFood = new foodModel({
      name,
      price,
      owner,
      RestaurantName,
      description,
      preparingTime,
      category,
      food_pic: req.files?.map((file) => file.path) || [],
      Cloudinary_Id: req.files?.map((file) => file.filename) || [],
    });

    await newFood.save();

    res.status(201).json({
      success: true,
      message: "New food added successfully",
      newFood,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteFood = async (req, res, next) => {
  try {
    const { id } = req.params;

    const food = await foodModel.findById(id);

    if (!food) {
      return next(new HttpError("Food not found", 404));
    }

    if (food.Cloudinary_Id?.length > 0) {
      for (const imageId of food.Cloudinary_Id) {
        await cloudinary.uploader.destroy(imageId);
      }
    }

    await foodModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const updateFood = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foodUpdate = await foodModel.findById(id);

    if (!foodUpdate) {
      return next(new HttpError("Food data not found with this id", 404));
    }

    const updates = Object.keys(req.body);

    const allowedUpdates = [
      "name",
      "price",
      "owner",
      "RestaurantName",
      "description",
      "preparingTime",
      "category",
      "isAvailable",
      "isVerified",
    ];

    const isValidUpdates = updates.every((field) =>
      allowedUpdates.includes(field),
    );

    if (!isValidUpdates) {
      return next(new HttpError("Only allowed fields can be updated", 400));
    }

    updates.forEach((update) => {
      foodUpdate[update] = req.body[update];
    });

    if (req.files ) {
      if (foodUpdate.Cloudinary_Id) {
        for (const imageId of foodUpdate.Cloudinary_Id) {
          await cloudinary.uploader.destroy(imageId);
        }
      }

      foodUpdate.food_pic = req.files.map((file) => file.path);
      foodUpdate.Cloudinary_Id = req.files.map((file) => file.filename);
    }
    await foodUpdate.save();

    res.status(200).json({
      success: true,
      message: "Food updated successfully",
      data: foodUpdate,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllFood = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      RestaurantName,
      isAvailable,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    if (RestaurantName) {
      filter.RestaurantName = RestaurantName;
    }

    if (isAvailable !== undefined) {
      filter.isAvailable = isAvailable === "true";
    }

    const totalFood = await foodModel.countDocuments(filter);

    const foods = await foodModel
      .find(filter)
      .populate("category")
      .populate("owner", "Name Email")
      .populate("RestaurantName")
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    if (foods.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food data found",
      totalFood,
      page: Number(page),
      foods,
      totalPages: Math.ceil(totalFood / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
  addFood,
  deleteFood,
  updateFood,
  getAllFood,
};