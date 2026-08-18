import Order from "../model/order.model.js";
import HttpError from "../middleware/HttpError.js";
import foodModel from "../model/food.model.js";

const placeOrder = async (req, res, next) => {
    try {
        const { Address, RestaurantName, fooditems } = req.body;

        const customerName = req.user._id;

        const foodIds = fooditems.map((item) => item.food);

        console.log("food id", foodIds);

        const foods = await foodModel.find({
            _id: { $in: foodIds }
        });

        console.log("user for food", foods);

        let totalAmount = 0;

        const orderItems = fooditems.map((item) => {
            const foodFound = foods.find(
                (food) =>
                    food._id.toString() === item.food.toString()
            );

            console.log("food found", foodFound);

            const itemsTotal = foodFound.price * item.qty;

            console.log("item total", itemsTotal);

            totalAmount += itemsTotal;

            return {
                food: foodFound._id,
                qty: item.qty
            };
        });

        console.log("total amount", totalAmount);

        const newOrder = await Order.create({
            customerName:userId,
            Address,
            items: orderItems,
            RestaurantName,
            totalAmount
        });

        const orderPopulate = await newOrder.populate([
            {
                path: "customerName",
                select: "name email"
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