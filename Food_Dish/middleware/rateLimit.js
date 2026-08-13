
import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs: 15*6*1000,
    limit:500,
    message:"Too many request to this id"
});

export const authLimiter = rateLimit({
    windowMs:15*6*1000,
    limit:5,
    message:"Too many request to this id"
})