
import categoryModel from "../model/category.model.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";

const add = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const newCategory = await categoryModel({
            name,
            description,
            categoryImage: req.file?.path,
            Cloudinary_Id: req.file?.filename,

        });
        await newCategory.save();

        res.status(201).json({
            success: true,
            message: "new category added successfully",
        })
    } catch (error) {
        next(new HttpError(error.message, 500))
    }
};

export default { add }