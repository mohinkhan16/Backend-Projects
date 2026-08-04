import JWT from "jsonwebtoken";
import HttpError from "./httpError.js";
import modelUser from "../model/user.model.js";

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return next(new HttpError("auth header is requried", 404));
        }

        const token = authHeader.replace("Bearer", "").trim();

        const decode = JWT.verify(token, process.env.JWT_SECRET);

        const user = await modelUser.findOne({
            _id: decode._id,
            "tokens.token": token,
        });

        if (!user) {
            return next(new HttpError("Authentication failed", 404));
        }

        req.user = user;
        req.token = token;

        next();

    } catch (error) {
        next(new HttpError("please authenticate", 401));
    }
};

export default auth;
