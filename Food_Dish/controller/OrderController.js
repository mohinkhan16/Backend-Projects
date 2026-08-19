
import Order from "../model/order.model.js";
import HttpError from "../middleware/HttpError.js";
import foodModel from "../model/food.model.js";

const placeOrder = async (req, res, next) => {
    try {
        const { Address, RestaurantName, fooditems } = req.body;

        const customerName = req.user._id;

        const foodIds = fooditems.map((item) => item.foodId);

        const foods = await foodModel.find({
            _id: { $in: foodIds }
        });

        let totalAmount = 0;

        const orderItems = fooditems.map((item) => {
            const foodFound = foods.find(
                (food) =>
                    food._id.toString() === item.foodId.toString()
            );

            if (!foodFound) {
                throw new Error(`Food not found: ${item.foodId}`);
            }

            const itemsTotal = foodFound.price * item.qty;

            totalAmount += itemsTotal;

            return {
                food: foodFound._id,
                qty: item.qty
            };
        });

        const newOrder = await Order.create({
            customerName,
            Address,
            items: orderItems,
            RestaurantName,
            totalAmount
        });

        const orderPopulate = await newOrder.populate([
            {
                path: "customerName",
                select: "Name Email"
            },
            {
                path: "items.food",
                select: "name"
            },
            {
                path: "RestaurantName"
            }
        ]);

        res.status(201).json({
            success: true,
            message: "order placed successfully",
            order: orderPopulate
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

export default { placeOrder };

