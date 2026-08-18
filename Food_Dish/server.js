
// external module
import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// local modules
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";

// router
import UserRouter from "./router/UserRouter.js";
import adminRouter from "./router/adminRouter.js";
import RestaurantRouter from "./router/RestaurantRouter.js";
import RestaurantModel from "./model/RestaurantModel.js";
import modelUser from "./model/UserModel.js";
import ProviderRouter from "./router/ProviderRouter.js";
import foodRouter from "./router/foodRouter.js";
import CategoryRouter from "./router/CategoryRouter.js";
import OrderRouter from "./router/OrderRoutes.js"

//Securety
import helmet from "helmet";
import hpp from "hpp";
import rateLimiter from "express-rate-limit";

const app = express();
app.use(express.json());

app.use(helmet());
app.use(hpp());
app.use(rateLimiter());

app.use("/user", UserRouter);
app.use("/admin", adminRouter);
app.use("/restaurant", RestaurantRouter);
app.use("/provider",ProviderRouter);
app.use("/food",foodRouter);
app.use("/category",CategoryRouter);
app.use("/Order",OrderRouter);

// server check
app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});

app.use((req, res, next) => {
  return next(new HttpError("requested route not found", 404));
});

// centralize error
app.use((error, req, res, next) => {
  console.log(error);
  
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error " });
});

const port = 5000;

async function serverStart() {
  try {
    const connect = await connectDB();

    if (!connect) {
      return console.log("failed to connect db");
    }

    app.listen(port, (err) => {
      if (err) {
        return console.log(err.message);
      }

      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

serverStart();