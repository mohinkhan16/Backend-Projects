
import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({

    customerName:{
      type:String,
      required:true
    },
    Address:{
        type:String,
        required:true
    },
   RestaurantName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
    },
    fooditems:[{
        foodId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"food",
            required:true,
        },
        qty:{
            type:Number,
            requried:true,
            min:1,
        },
    }],
    orderStatus:{
        type:String,
        enum:[
            "Pending",
            "Confirmed",
            "Otw",
            "Cancelled",
            "preparing"
        ],
        default:"Pending"
    }
},{
    timestemps:true
})

const orderModel = mongoose.model("order",OrderSchema);
export default orderModel;