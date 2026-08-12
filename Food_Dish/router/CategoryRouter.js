import express from express;
import categoryController from "../controller/categoryController.js";
import { categoryImage } from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post("/addCategory", auth, categoryImage.single("categoryImage"), checkRole("admin"), categoryController.add);

export default router

