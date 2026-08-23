import express from "express";

import userController from "../controller/user.controller";

const router = express.Router();

router.post ("/add",userController.add);

router.get("/getAll",userController.getAll);

router.post("/Login",userController.login);

router.post("/authLogin",userController.authLogin);

router.delete("/deleteuser",userController.delteUser);

router.patch("/update",profilePic.single("Profile_Pic"),userController.updatedUser);

export default router;