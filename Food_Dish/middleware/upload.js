
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";


// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "Food",
//     allowed_formats: ["jpeg", "jpg", "png", "webp"],
//     transformation: [
//       {
//         height: 800,
//         width: 800,
//         crop: "limit",
//       },
//       {
//         fetch_format: "webp",
//       },
//     ],
//   },
// });

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },
// });


const Upload = ({
  folder,
  formate,
  mimeTypes = [],
  filesize = 5 * 1024 * 1024,
  resource_type = "auto",
}) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
      folder,
      allowed_formats: formate,
      resource_type,
    }),
  });

  return multer({
    storage,
    limits: {
      fileSize: filesize,
    },
    fileFilter: (req, file, cb) => {
      if (mimeTypes.length === 0 || mimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("File format is not valid"), false);
      }
    },
  });
};

export default Upload;