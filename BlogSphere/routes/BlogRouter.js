import express from "express";
import BlogController from "../controller/Blog.controller.js";
import auth from "../middleware/Auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", auth, upload.single("BlogImg"), BlogController.BlogAdd);
router.post("/add", auth, upload.single("BlogImg"), BlogController.BlogAdd);
router.get("/", BlogController.getAllBlog);
router.get("/all", BlogController.getAllBlog);
router.patch("/:id", auth, upload.single("BlogImg"), BlogController.UpdateBlog);
router.patch("/update/:id", auth, upload.single("BlogImg"), BlogController.UpdateBlog);
router.delete("/:id", auth, BlogController.deleteBlog);
router.delete("/delete/:id", auth, BlogController.deleteBlog);

export default router;
