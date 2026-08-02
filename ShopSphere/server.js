

//third pparty modules
import express from "express";
import dotenv from "dotenv"
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
dotenv.config("./.env")


const app =express();
app.use(express.json());

//Server check
app.get("/",(req,res)=>{
    res.json({message:"hello from server"});
})

//middleware
app.use((req,res,next)=>{
    next(new HttpError("request rout not found"))
});

//centrlized error

app.use((error,req,res,next)=>{
    if(res.hedersSent){
        return ext(error);
    }
    res.status(error.message || 500).json({
        success:true,
        message:error.message ||"internal server error"
    })
})

async function StartServer() {
    try {
        await connectDB();

        const port = process.env.PORT || 5000;

        app.listen(port,()=>{
            console.log("server running on port ${port");
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1);
        
    }
}

StartServer();