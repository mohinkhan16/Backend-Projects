import express from "express";
import auth from "../middleware/auth.js";
import {document} from "../middleware/upload.js";
import ProviderController from "../controller/ProviderController.js";
import { updateProviderSchema } from "../validation/ProviderSchema.js";
import validate from "../middleware/validate.js";
import providerModel from "../model/ProviderModel.js";
import checkRole from "../middleware/checkRole.js"

const router = express.Router();

router.post(
  "/add",
  auth,
 document.array("document", 3),
  validate(updateProviderSchema),
  ProviderController.resgisterAsprovider
);

router.patch("/providerUpdate/:id",
  auth,checkRole("admin"),document.array("document",3),
  ProviderController.updateProvider,
);

router.delete("/providerDelete/:id",
  auth,checkRole("admin",ProviderController.deleteProvider)
)
export default router;