import HttpError from "./HttpError.js";

const CheckRole=(...Role)=> async function(req,res,next){

    try {
        if(!req.user){
            return next(new HttpError("please authenticate to continue",400));
        }
        if(!role.includes(req.user.Role)){
            return next(new HttpError("forbidden access",403));
        }

        next();
    } catch (error) {
        return next(new HttpError(error.message,500))
    }
}

export default CheckRole;