

import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: [
            "Gujarati",
            "Chinese",
            "South Indian",
            "Punjabi",
            "Pizza",
            "Burger",
            "Italian",
            "Dessert",
            "Drinks",
        ],
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    categoryImage: {
        type: String
    },
    Cloudinary_Id: {
        type: String
    },
});

const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;   