import express from "express";
import HttpError from "./middleWare/HttpError.js"
import dotenv from "dotenv";
dotenv.config(path,"./.env");

const app = express()
app.use(express.json());

//server checking
app.get("/",(req,res,next)=>{
    res.status(200).json({success:true,
        message:"hello from server"
    })
})

//middelware
app.get((req,res,next)=>{
    next(new HttpError("Request route not found"));
})

//centrilized error
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
async function StartServer() {
    try {
        await connectDB();

        const port = process.env.PORT || 5000;

        app.listen(port,()=>{
            console.log(`server runnning on port ${port}`);
            
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
        
    }
}

StartServer();