
import express from "express";

import auth from "../middleware/auth.js";
import RestaurantController from "../controller/RestaurantController.js";
import checkRole from "../middleware/checkRole.js";
import upload from "../middleware/upload.js";
import { restaurantSchema } from "../validation/RestaurantSchema.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/addRestaurant",
  auth,
  checkRole("admin"),
  upload.single("RestaurantImage"),
  validate(restaurantSchema),

  RestaurantController.add,
);

router.delete(
  "/deleteRes/:id",
  auth,
  checkRole("admin"),
  RestaurantController.deleteRestaurant,
);

router.patch(
  "/updateRes/:id",
  auth,
  checkRole("admin"),
  upload.single("RestaurantImage"),
  RestaurantController.updateRestaurant,
);

router.get(
  "/allRestaurants",
  auth,
  checkRole("admin"),
  RestaurantController.getAllRestaurants,
);

export default router;