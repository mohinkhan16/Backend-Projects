import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const createUploads = ({
  folder,
  transformation = [],
  resource_type = "auto",
  fileSize = 5 * 1024 * 1024,
  allowed_formats = [],
  mimetype = [],
}) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      return {
        folder,
        transformation,
        resource_type,
        allowed_formats,
      };
    },
  });

  return multer({
    storage,
    limits: {
      fileSize,
    },
    fileFilter: (req, file, cb) => {
      if (mimetype.length && !mimetype.includes(file.mimetype)) {
        return cb(
          new Error(
            `Invalid file type. Allowed types: ${mimetype.join(", ")}`
          ),
          false
        );
      }

      cb(null, true);
    },
  });
};

export const profilePic = createUploads({
  folder: "Food_Dish/Profile_Pic",
  transformation: [
    {
      width: 800,
      height: 800,
      crop: "limit",
    },
    {
      fetch_format: "webp",
    },
    {
      quality: "auto",
    },
  ],
  allowed_formats: ["jpg", "jpeg", "png", "webp"],
  mimetype: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ],
});

export const RestaurantImage = createUploads({
  folder: "food_Dish/RestaurantImage",
  transformation: [
    { height: "800", width: "800", crop: "limit" },
    { fetch_format: "webp" },
    { quality: "auto" },
  ],
  allowed_formats: ["jpeg", "jpg", "png", "webp"],
  mimetype: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
});

export const document = createUploads({
  folder: "Food_Dish/Documents",
  resource_type: "raw",
  allowed_formats: ["pdf"],
  mimetype: ["application/pdf"],
});

export const categoryImage = createUploads({
  folder: "Food_Dish/categoryImage",
  transformation: [
    { height: "800", width: "800", crop: "limit" },
    { fetch_format: "webp" },
    { quality: "auto" },
  ],
  allowed_formats: ["jpeg", "jpg", "png", "webp"],
  mimetype: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
});