import express from express;
import categoryController from "../controller/categoryController.js";
import auth, { categoryImage } from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post("/addCategory", auth, categoryImage.single("categoryImage"), checkRole("admin"), categoryController.add);

router.get("/allCategory", auth, checkRole("admin"), categoryController.getAllCategory);

router.delete("/delete/:id", auth, checkRole("admin", categoryController.deleteCategory));

router.patch("/update/:id", auth, categoryImage.single("categoryImage"), checkRole("admin"), categoryController.updatecategory);

export default router

