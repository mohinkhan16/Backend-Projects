import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  RestaurantName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  description: {
    type: String,
    required: true,
  },
  preparingTime: {
    type: String,
    min: 1,
    max: 30,
    required: true
  },
  food_image: [{
    type: String,
    required: true
  },],
  Cloudinary_Id: {
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  IsVerified: {
    type: Boolean,
    default: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true
  },
}, {
  timestamps: true,
},);

const foodModel = mongoose.model("food", foodSchema);
export default foodModel;