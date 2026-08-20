import express from "express";
import auth from "../middleware/auth.js";
import OrderController from "../controller/OrderController.js";
import Checkroll from "../middleware/checkRole.js"

const router = express.Router();

router.post("/placeOrder",auth,OrderController.placeOrder);


export default router;