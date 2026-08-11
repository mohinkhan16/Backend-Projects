// restaurantController

import RestaurantModel from "../model/RestaurantModel.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";
import { getWelcomeEmailTemplate } from "../services/emailTemplate.js";
const add = async (req, res, next) => {
  try {
    const {
      RestaurantName,
      Address,
      Phone,
      description,
      state,
      city,
      openTime,
      closeTime,
      owner,
    } = req.body;

    const newRestaurant = await RestaurantModel({
      RestaurantName,
      Address,
      Phone,
      description,
      state,
      city,
      openTime,
      closeTime,
      owner: req.user._id,
      RestaurantImage: req.file?.path || null,
      Cloudinary_Id: req.file.filename || null,
    });

    await newRestaurant.save();

    await sendEmail({
      to:req.user.Email,
      subject:"Resturant Added Successfully - Food_Dish",
      html:getWelcomeEmailTemplate(newRestaurant.RestaurantName,"resturant")
    })

    res.status(201).json({
      success: true,
      message: "newRestaurant added successfully",
      newRestaurant,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    const targetedUser = req.params.id;

    const Restaurant = await RestaurantModel.findById(targetedUser);

    if (user.Cloudinary_Id) {
      await cloudinary.uploader.destroy(Restaurant.Cloudinary_Id);
    }

    await Restaurant.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Restaurant data delete successfully" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.id);

    if (!restaurant) {
      return next(new HttpError("Restaurant not found", 404));
    }

    const updates = Object.keys(req.body);

    const allowedFields = [
      "RestaurantName",
      "Address",
      "Phone",
      "description",
      "state",
      "city",
      "openTime",
      "closeTime",
    ];

    const isValidUpdate = updates.every((field) =>
      allowedFields.includes(field),
    );

    if (!isValidUpdate) {
      return next(new HttpError("Only allowed fields can be updated", 400));
    }
    if (req.file) {
      if (restaurant.Cloudinary_Id) {
        await cloudinary.uploader.destroy(restaurant.Cloudinary_Id);
      }

      restaurant.RestaurantImage = req.file.path;
      restaurant.Cloudinary_Id = req.file.filename;
    }

    updates.forEach((field) => {
      restaurant[field] = req.body[field];
    });

    await restaurant.save();

    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllRestaurants = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      isOpen,
      search,
      city,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    page = Number(page);

    limit = Number(limit);

    const filter = {};

    if (search) {
      filter.RestaurantName = {
        $regex: search,
        $options: "i",
      };
    }

    if (city) {
      filter.city = city;
    }

    if (isOpen !== undefined) {
      filter.isOpen = isOpen === "true";
    }

    const sortOption = {
      [sort]: order === "asc" ? 1 : -1,
    };

    const totalRestaurant = await RestaurantModel.countDocuments(filter);

    const restaurants = await RestaurantModel.find(filter)
      .populate("owner", "Name Email Address -_id")
      .skip((page - 1) * limit)
      .lean()
      .sort(sortOption)
      .limit(limit);

    if (restaurants.length === 0) {
      res.status(404).json({ success: true, message: "restaurant not found" });
    }

    res.status(200).json({
      success: true,
      message: "restaurant data found",
      totalRestaurant: totalRestaurant,
      page: page,
      restaurants,
      totalPages: Math.ceil(totalRestaurant / limit),
      CurrentPage: page,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { add, deleteRestaurant, updateRestaurant, getAllRestaurants };