
import mongoose from "mongoose";
import { type } from "node:os";

const EventSchema = new mongoose.Schema({
    EventName:{
        type:String,
        trim:true,
        required:true
    },
    EventDate:{
        type:Date,
        required:true
    },
    EventVenu:{
        type:String,
        required:true
    },
    EventDescription:{
        type:String,
    },
    TicketPrice:{
        type:Number,
        required:true
    },
    EventImage:{
        type:[String],
        required:true
    },
    EventPoster:{
        type:[String],
        required:true
    },
    EventSpeker:{
        type:[String],
        required:true
    },
    EventBanner:{
        type:[String],
        required:true
    }
})

const Event = mongoose.model("EventManagement",EventSchema);

export default Event;