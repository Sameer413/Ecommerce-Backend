import express from "express";
import {
    updatePassword,
    registerUser,
    userLogin,
    userLogout,
    userProfile,
    updateRole
} from "../controller/userCtrl.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(userLogin);

router.route("/me").get(isAuthenticated, userProfile);

router.route("/me/updatepassword").post(isAuthenticated, updatePassword);

router.route("/role/update/:_id").put(isAuthenticated, isAdmin, updateRole);

router.route("/logout").get(isAuthenticated, userLogout);

export default router;