
import express from "express";

import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import ProviderController from "../controller/ProviderController.js";

const router = express.Router();


router.post("/add", auth,upload.single("document"),ProviderController.addProvider)

export default router