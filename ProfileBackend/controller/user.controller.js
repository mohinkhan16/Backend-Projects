    import modelUser from "../model/user.model.js";
    import HttpError  from "../middleware/HttpError.js";


    const Add = async (req,res,next) =>{
        try {
            const { Name,
            Email,
            Password,
            Address,
            Phone}=req.body;

            const newUser = await modelUser({
        Name,
            Email,
            Password,
            Address,
            Phone
            })
            await newUser.save();
            res.status(201).json({
                success:true,
                message:"new Blog added successfully",newUser
            })
        } catch (error) {
            console.log(error);
            next(new HttpError(error.message,500));
        }
    }

    const getAll = async (req, res, next) => {

    try {
        const users = await modelUser.find({});

        if(!users){
        return next(new HttpError("user not found"));
        }

        res.status(200).json({
        success: true,
        message: "All data found successfully",
        users,
        });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
    };


    const login = async (req, res, next) => {
    try {
        const { Email, Password } = req.body;

        const user = await modelUser.findByCredentials(Email, Password);

        const token = await user.generateAuthToken();

        res.status(200).json({
        success: true,
        message: "Login successfully",
        user,
        token,
        });
    } catch (error) {
        console.log(error);
        next(new HttpError(error.message, 500));
    }
    };

    const AuthLogin = async (req,res,next)=>{
    try {
        
        const user = req.user;

        if(!user){
        return next(new HttpError("unable to login",401));
        }

        res.status(200).json({
        success:true,
        user
        })
    } catch (error) {
        next(new HttpError(error.message,500));
    }
    }

    const logOut = async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter(
        (t) => t.token !== req.token
        );

        await req.user.save();

        res.status(200).json({
        success: true,
        message: "User logout successfully",
        });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
    };

 const logOutAll = async (req, res, next) => {
   try {
    req.user.tokens = [];

    await req.user.save();

    res.status(200).json({
      success: true,
      message: "User logged out from all devices successfully",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

    const UpdateUser = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
        return next(new HttpError("No user found", 404));
        }

        const updates = Object.keys(req.body);

        const allowedFields = ["Name", "Password", "Address", "Phone"];

        const isValid = updates.every((field) =>
        allowedFields.includes(field)
        );

        if (!isValid) {
        return next(new HttpError("Only allowed fields can be updated", 400));
        }

        updates.forEach((field) => {
        user[field] = req.body[field];
        });

        await user.save();

        res.status(200).json({
        success: true,
        message: "User updated successfully",
        user,
        });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
    };

    const DeleteUser = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
        return next(new HttpError("User not found", 404));
        }

        await user.deleteOne();

        res.status(200).json({
        success: true,
        message: "User deleted successfully",
        });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
    };


    export default{Add,getAll,login,AuthLogin,logOut,UpdateUser,DeleteUser,logOutAll};