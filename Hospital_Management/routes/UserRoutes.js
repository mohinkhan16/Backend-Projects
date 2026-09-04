import express from "express";
import controller from "../Controller/UserController.js";
import auth from "../middleWare/Auth.js"


const router = express.Router();

router.post("/Add",controller.Add);

router.post("/login",auth,controller.login);

router.post("/authlogin",auth,controller.AuthLogin);

router.post("/logoutAll",auth,controller.logoutAll);

router.post("/logout",auth,controller.logout);

router.get("/getAll",auth,controller.GetAll);

router.delete("/deleteuser",auth,controller.Deleteuser);

router.patch("/updateUser",auth,controller.UpdateUser);



export default router;