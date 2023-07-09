import catchAsyncError from "../middlewares/catchAsyncError.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../utils/errorHandler.js"
import { sendToken } from "../utils/sendToken.js";

// register
// login
// logout
// change password


// Pending = update User || forgot password - reset password || 

export const registerUser = catchAsyncError(async (req, res, next) => {

    const { firstName, lastName, email, password } = req.body;

    // Checking if "User" already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("User Already Exists", 409));
    }

    if (!firstName || !lastName || !email || !password) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    // Converting Password into hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        success: true,
        newUser,
    });
});

export const userLogin = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Enter email or password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return next(new ErrorHandler("Enter correct password"));
    }
    sendToken(res, user, `Welcome ${user.firstName + " " + user.lastName}`, 201);
});

export const userProfile = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    res.status(200).json({
        user,
    });
});

export const userLogout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    });
});

export const updatePassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user._id).select("+password");
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const isMatched = await bcrypt.compare(oldPassword, user.password);

    if (!isMatched) {
        return next(new ErrorHandler("Enter correct password", 400));
    } else if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("Password does not matched"))
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password changed successfully"
    });
});

export const updateRole = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params._id);

    if (!user) {
        return next(new ErrorHandler("user not found", 404));
    };

    if (user.role == "user") {
        user.role = "admin"
    } else {
        user.role = "user"
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: "Role updated successfully",
    });
});

export const updateUser = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName } = req.body;
    // soon
})