
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

const updatecategory = async (req, res, next) => {
    try {
        const { id } = req.body;

        const categoryUpdate = categoryModel.findById(id);

        if (!categoryUpdate) {
            return next(new HttpError("category data not found", 404))
        }

        const update = Object.keys(req.body);

        const allowUpdates = ["name", "description"];

        const isValidate = update.every((fileds) => {
            allowUpdates.includes(fileds)
        });

        if (!isValidate) {
            return next(new HttpError("only allowed feilds can be update"))
        }

        update.forEach((update) => {
            categoryUpdate[update] = req.body;
        })

        if (req.file) {
            if (categoryUpdate.Cloudinary_Id) {
                await cloudinary.uploader.destroy(categoryUpdate.Cloudinary_Id);
            }

            categoryUpdate.categoryImage = req.file.path;
            categoryUpdate.Cloudinary_Id = req.file.filename;
        }

        await categoryUpdate.save();

        res.status(201).json({
            success: true,
            message: "category update successfully",
            data: categoryUpdate
        })

    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const category = await categoryModel.findById(id);

        if (!category) {
            return next(new HttpError("category not found", 404));
        }

        if (category.Cloudinary_Id) {
            await categoryModel.findByIdAndDelete(id);
        }

        res.status(201).json({
            success: true,
            message: "categorary delete successfully",
        })
    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}

const getAllCategory = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
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

        const totalCategory = await categoryModel.countDocuments(filter);

        const categories = await categoryModel
            .find(filter)
            .sort({ [sort]: order === "asc" ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "category not found"
            });

            res.status(200).json({
                success: true,
                message: "Category data found",
                totalCategory,
                page: Number(page),
                categories,
                totalPages: Math.ceil(totalCategory / limit),
                currentPage: Number(page),
            });
        }
    } catch (error) {
        next(new HttpError(error.message,500))
    }
}

export default { add, updatecategory, deleteCategory, getAllCategory }