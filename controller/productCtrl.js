import catchAsyncError from "../middlewares/catchAsyncError.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";


// Create a product
// delete a product 
// updating a product
// getting all the product 
// getting a single product

export const createProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user._id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product
    });
});

export const getAllProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find({});

    if (!products) {
        return next(new ErrorHandler("Products not found", 404));
    }

    res.status(200).json({
        products,
    })
});

export const updateProduct = catchAsyncError(async (req, res, next) => {
    console.log("hello");
    let product = await Product.findById(req.params._id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product
    });

});

export const deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params._id);

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});

export const getAProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params._id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});