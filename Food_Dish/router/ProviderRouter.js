import express from "express";
import auth from "../middleware/auth.js";
import Upload from "../middleware/upload.js";
import ProviderController from "../controller/ProviderController.js";
import { updateProviderSchema } from "../validation/ProviderSchema.js";
import validate from "../middleware/validate.js";

const router = express.Router();

const upload = Upload({
  folder: "Provider",
  formate: ["jpg", "jpeg", "png", "pdf"],
  mimeTypes: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ],
});

router.post(
  "/add",
  auth,
  upload.single("document"),
  validate(updateProviderSchema),
  ProviderController.resgisterAsprovider
);

export default router;