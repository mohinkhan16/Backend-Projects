import express from "express"
import dotenv from "dotenv"
import HttpError from "./middleware/HttpError.js";
dotenv.config({path:"./.env"})

const app = express();
app.use(express.json)

app.get("/",(req,res)=>{
    res.json({
        message:"hello from server"
    })
})

app.use((req,res,next)=>{
    return next(new HttpError("request rout not found",404))
});

app.use((error,req,res,next)=>{
    if(res.headersent){
        return next(error)
    }

    res.status(error.statuscode || 500).json({
        message:error.message || "something went wrrong"
    });
});

const port = 5000;

async function severStart() {
    try {
        const connect = await connectDB();

        if(!connect){
            throw new Error("failed to connectDB")
        }

        app.listen((port,(err)=>{
            if(err){
                return console.log(err.message);
            }
            console.log(`server running on port ${port}`);
            
        }))
    } catch (error) {
        
        console.log(error.message);
        process.exit(1);
    }
}

severStart();