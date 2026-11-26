
    import express from "express";
    import Usercontroller from "../controller/user.controller.js";
    import auth from "../middleware/Auth.js";
    import upload from "../middleware/upload.js"

    const router = express.Router();

    router.post("/add", upload.single("Profile_Pic"), Usercontroller.add);
    router.post("/register", upload.single("Profile_Pic"), Usercontroller.add);

    router.get("/test", (req, res) => {
        res.json({
            success: true,
            message: "Router is working"
        });
    });

    router.get("/getAll",Usercontroller.getAllUser);
    router.get("/all",Usercontroller.getAllUser);

    router.post("/login",Usercontroller.login);

    router.post("/authLogin",auth,Usercontroller.authLogin);
    router.get("/authlogin",auth,Usercontroller.authLogin);
    router.post("/authlogin",auth,Usercontroller.authLogin);

    router.get("/logout",auth,Usercontroller.logout);
    router.get("/logoutAll",auth,Usercontroller.logoutAll);
    router.get("/logoutall",auth,Usercontroller.logoutAll);

    router.delete("/deleteUser",auth,Usercontroller.deleteUser);
    router.delete("/delete",auth,Usercontroller.deleteUser);

    router.patch("/Update",auth,upload.single("Profile_Pic"),Usercontroller.updateUser);
    router.patch("/update",auth,upload.single("Profile_Pic"),Usercontroller.updateUser);

    export default router;