
import moongoose from "mongoose";

const auditLogSchema = mongoose.Schema({
    action:{
        type:String,
        requried:true
    },
    perfomedBy:{
        type:moongoose.Schema.Types.ObjectId,
        ref:"user",
        requried:true,
    },
    module:{
        type:String,
        requried:true
    },
    targetedId:{
        type:moongoose.Schema.Types.ObjectId,
        ref:"user",
        requried:true
    },
    Ip:{
        type:String,
        requried:true
    },
    userAgent:{
        type:String,
        requried:true
    }
});

const auditLog = moongoose.model("audit",auditLogSchema);

export default auditLog;