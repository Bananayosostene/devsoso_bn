import express, { Router } from "express";
import passport from "passport";
import { checkPermission, isAuthenticated } from "../middlewares/authMiddleware";
import { uploaded } from "../utils/multer";
import UserController from "../controllers/userController";
import loginController from "../controllers/loginController";

const userRoute: Router = express.Router();

userRoute.post(
    "/login",
    loginController.login);

    userRoute.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

userRoute.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  loginController.googleLogin
);
userRoute.post(
    "/signUp",
    UserController.createUser);
userRoute.get(
    "/get/:userId",
    isAuthenticated,
    checkPermission,
    UserController.getUserById
);
userRoute.get(
    "/getUsers",
    isAuthenticated,
    checkPermission,
    UserController.findAllUsers
);
userRoute.delete(
    "/delete/:userId",
    isAuthenticated,
    checkPermission,
    UserController.deleteUserById);
userRoute.patch(
    "/updateProfile",
    uploaded,
    isAuthenticated,
    UserController.updateUserProfile as express.RequestHandler
 );
userRoute.get(
    "/showProfile",
    isAuthenticated,
    UserController.showProfile as express.RequestHandler
 );

export default userRoute; 
