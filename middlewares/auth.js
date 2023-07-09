import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import { User } from "../models/user.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    // Taking token from cookies
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Not logged In", 401));
    };

    // Decoding the token and matching with the Secret key, It will give user's _id.
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});

export const isAdmin = catchAsyncError(async (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new ErrorHandler("Role user not allowed to access this resources", 403));
    }
    next();
});