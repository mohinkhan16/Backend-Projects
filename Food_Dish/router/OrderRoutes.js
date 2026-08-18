import express from "express";
import auth from "../middleware/HttpError.js";
import OrderController from "../controller/OrderController.js";

const router = express.Router();

router.post("/placeOrder",auth,OrderController.placeOrder);

export default router;