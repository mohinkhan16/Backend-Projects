import express from "express";

import UserController from "../controller/UserController.js";
import { registerSchema, updateUserSchema } from "../validation/UserSchema.js";
import validate from "../middleware/validate.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import { profilePic } from "../middleware/upload.js";
import { rateLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

router.post(
  "/add",
  profilePic.single("Profile_Pic"),
  rateLimiter,
  // validate(registerSchema),
  UserController.add
);

router.post("/userLogin", UserController.login);

router.post("/authLogin", auth,rateLimiter,UserController.authLogin);

router.delete("/delete", auth, UserController.deleteUser);

router.patch(
  "/update",
  auth,
  profilePic.single("Profile_Pic"),
  validate(updateUserSchema),
  UserController.updateUser
);

router.get("/logoutUser", auth, UserController.logout);

router.get("/allLogout", auth, UserController.logoutAll);

router.get(
  "/allUser",
  auth,
  checkRole("admin"),
  UserController.getAllUser
);

export default router;