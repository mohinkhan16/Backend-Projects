import express from "express";
import HttpError from "./middleware/httpError.js";
import connectDB from "./config/db.js";
import router from "./routes/userRouter.js";
import dotenv from "dotenv";
dotenv.config({path:"./.env"});

const app = express();
app.use(express.json());

app.get("/",(req,res,next)=>{
    res.status(200).json({success: true,
        message: "Hello from server"})
});

//router
app.use("/Profile",router)

//middleware
app.use((req,res,next)=>{
    next(new HttpError("Request route not found",404));
})

//centralized error 
app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        success:false,
        message:error.message || "internal server error"
    });
});

//server 
async function Startserver() {
    try {
        await connectDB();

        const port = process.env.PORT || 5000;

        app.listen(port,()=>{
            console.log(`server running on port ${port}`); 
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1)
        
    }
}
Startserver();
