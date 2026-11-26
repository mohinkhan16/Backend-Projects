import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import router from "./routes/userRouter.js";
import BlogRouter from "./routes/BlogRouter.js";
import AdminRouter from "./routes/adminRouter.js";

dotenv.config({ path: "./.env" });

const app = express();

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use("/JWT/auth", router);
app.use("/user", router);
app.use("/blog", BlogRouter);
app.use("/admin", AdminRouter);

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Hello from server",
  });
});

// 404 middleware
app.use((req, res, next) => {
  next(new HttpError("Request route not found", 404));
});

// centralized error handling
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "internal server error",
  });
});

// server startup
async function Startserver() {
  const port = process.env.PORT || 5001;

  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });

  try {
    await connectDB();
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
}

Startserver();
