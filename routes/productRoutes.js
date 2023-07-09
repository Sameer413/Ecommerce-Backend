import express from "express";
import { createProduct, deleteProduct, getAProduct, getAllProducts, updateProduct } from "../controller/productCtrl.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/product/new").post(isAuthenticated, isAdmin, createProduct);

router.route("/products").get(getAllProducts);

router
    .route("/product/:_id")
    .get(getAProduct)
    .put(isAuthenticated, isAdmin, updateProduct)
    .delete(isAuthenticated, isAdmin, deleteProduct);


export default router;