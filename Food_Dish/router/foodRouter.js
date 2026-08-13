
import express from "express";
import foodController from "../controller/foodController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import validate from "../middleware/validate.js";
import { foodImage } from "../middleware/upload.js";

const router = express.Router();

router.post("/addfood",auth,checkRole("admin","provider"),foodImage.array("food_pic",5),foodController.addFood);

router.get("/allfood",auth,foodController.getAllFood);

router.delete("/delete/:id",auth,checkRole("admin","provider"),foodController.deleteFood);

router.patch("/update/:id",auth,checkRole("admin","provider"), foodImage.array("food_pic", 5),foodController.updateFood)

export default router;