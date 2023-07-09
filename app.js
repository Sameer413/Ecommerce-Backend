import { config } from "dotenv";
import express from "express";
import ErrorMiddleware from "./middlewares/error.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

config({
    path: "./config/config.env"
})



const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

import user from "./routes/userRoutes.js"
import product from "./routes/productRoutes.js"


app.use(user);
app.use(product);

app.use(ErrorMiddleware);

export default app;