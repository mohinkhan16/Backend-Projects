import express from "express";
import auth from "../middleware/auth.js";
import {document} from "../middleware/upload.js";
import ProviderController from "../controller/ProviderController.js";
import { updateProviderSchema } from "../validation/ProviderSchema.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/add",
  auth,
 document.array("document", 3),
  validate(updateProviderSchema),
  ProviderController.resgisterAsprovider
);

export default router;