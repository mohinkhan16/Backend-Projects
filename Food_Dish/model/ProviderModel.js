
import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
  providerName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  restaurantName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  document: [{
    type: String,
    required: true,
  }],
  Cloudinary_Id: [{
    type: String,
  }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  bankNumber: {
    type: String,
    required: true,
  },
});

const providerModel = mongoose.model("provider", providerSchema);

export default providerModel;