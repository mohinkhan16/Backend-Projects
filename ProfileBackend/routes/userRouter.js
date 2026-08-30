import express  from "express";
import controller from "../controller/user.controller.js"
import auth from "../middleware/Auth.js";

 const router = express.Router();

router.post("/Add",controller.Add);

router.get("/getAll",controller.getAll);

router.post("/login",controller.login);

router.post("/authlogin",auth,controller.AuthLogin);

router.post("/logout",auth,controller.logOut);

router.patch("/update",auth,controller.UpdateUser);

router.delete("/delete",auth,controller.DeleteUser);

router.post("/logoutAll", auth, controller.logOutAll);

export default router;
