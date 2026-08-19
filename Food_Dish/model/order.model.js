import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    Address: {
      type: String,
      required: true,
    },

    RestaurantName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "food",
          required: true,
        },

        qty: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Otw",
        "Cancelled",
        "preparing",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", OrderSchema);

export default orderModel;