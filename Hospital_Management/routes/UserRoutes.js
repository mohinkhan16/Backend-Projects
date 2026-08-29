import express from "express";
import controller from "../Controller/UserController.js";


const router = express.Router();

router.post("/Add",controller.Add);

router.post("/login",controller.login);

router.post("/authlogin",controller.AuthLogin);

export default router;