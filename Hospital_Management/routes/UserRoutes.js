import express from "express";
import controller from "../Controller/UserController.js";


const router = express.Router();

router.post("/Add",controller.Add);

router.post("/login",controller.login);

router.post("/authlogin",controller.AuthLogin);

router.post("/logoutAll",controller.logoutAll);

router.post("/logout",controller.logout);

router.get("/getAll",controller.GetAll);

router.delete("/deleteuser",controller.Deleteuser);

router.patch("/updateUser",controller.UpdateUser);



export default router;