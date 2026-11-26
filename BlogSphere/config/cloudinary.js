import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

cloudinary.config({
  cloud_name: (process.env.CLOUDINARY_NAME || "dagtefhdu").trim(),
  api_key: (process.env.CLOUDINARY_API_Key || "325737927698849").trim(),
  api_secret: (process.env.CLOUDINARY_API_SECRET || "8rXo9EGae9WKzZHcyX_Wk_vx0aA").trim(),
});

export default cloudinary;
