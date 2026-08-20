
// local module
import modelUser from "../model/UserModel.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";
import sendEmail from "../utils/sendEmail.js";
import RestaurantModel from "../model/RestaurantModel.js";
import auditLogger from "../middleware/auditLogger.js";
import { getWelcomeEmailTemplate } from "../services/emailTemplate.js";

// add user
const add = async (req, res, next) => {
  try {
    const { Name, Email, Password, Role, Address, Phone } = req.body;

    const newUser = await modelUser({
      Name,
      Email,
      Password,
      Role,
      Address,
      Phone,
      Profile_Pic: req.file?.path || null,
      Cloudinary_Id: req.file?.filename || null,
    });

    await newUser.save();

    await sendEmail({
      to: newUser.Email,
      subject: "Welcome to Food-Dish",
      html: getWelcomeEmailTemplate(newUser.Name, newUser.Role),
    });

    res.status(201).json({
      success: true,
      message: "new User added",
      newUser,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// login user
const login = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;

    const user = await modelUser.findByCredential(Email, Password);

    if (!user) {
      return next(new HttpError("unable to login"));
    }

    const token = await user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      user,
      token,
    });

    await auditLogger({
      action:"  USER_LOGIN",
      performedBy:user._id,
      module:"user",
      targetedId:user._id,
      Ip:req.ip,
      userAgent:req.get("user-agent"),
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// auth login
const authLogin = async (req, res, next) => {
  const user = req.user;

  console.log(user);

  res
    .status(200)
    .json({ success: true, message: "auth login successfully", user });
};

// logout
const logout = async (req, res, next) => {
  try {
    const user = req.user;

    user.tokens = user.tokens.filter((t) => t.token != req.token);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "user logout successfully" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

// logout from all dives
const logoutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.status(200).json({
      success: true,
      message: "user logout from all device successfully",
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

// get all user
const getAllUser = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      Address,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    page = Number(page);

    limit = Number(limit);

    const filter = {};

    if (search) {
      filter.Name = {
        $regex: search,
        $options: "i",
      };
    }

    if (Address) {
      filter.Address = Address;
    }

    const totalUser = await modelUser.countDocuments(filter);

    const users = await modelUser
      .find(filter)
      .skip((page - 1) * limit)
      .lean()
      .limit(limit);

    if (users.length === 0) {
      res.status(404).json({ success: true, message: "user not found" });
    }

    res.status(200).json({
      success: true,
      message: "user data found",
      totalUser: totalUser,
      page: page,
      users,
      totalPages: Math.ceil(totalUser / limit),
      CurrentPage: page,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// delete user

const deleteUser = async (req, res, next) => {
  try {
    const targetedUser = req.params.id || req.user._id;

    const user = await modelUser.findById(targetedUser);

    await cloudinary.uploader.destroy(user.Cloudinary_Id);

    await user.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "user data delete successfully" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

// update user
const updateUser = async (req, res, next) => {
  try {
    const targetedUser = req.params.id || req.user._id;

    const user = await modelUser.findById(targetedUser);

    const updates = Object.keys(req.body);

    let allowedFiled = ["Name", "Address", "Phone"];

    if (req.user.Role === "admin") {
      allowedFiled = [...allowedFiled, "isVerified"];
    }

    const isValidUpdate = updates.every((filed) => {
      return allowedFiled.includes(filed);
    });

    if (!isValidUpdate) {
      return next(new HttpError("only allowed filed can update", 404));
    }

    if (req.file) {
      if (user.Cloudinary_Id) {
        await cloudinary.uploader.destroy(user.Cloudinary_Id);
      }

      user.Profile_Pic = req.file.path;

      user.Cloudinary_Id = req.file.filename;
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.status(200).json({
      message: "user data updated successfully",
      user,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default {
  add,
  getAllUser,
  login,
  authLogin,
  logout,
  logoutAll,
  deleteUser,
  updateUser,
};