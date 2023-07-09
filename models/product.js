import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String
            }
        }
    ],
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            userName: {
                type: String,
                required: true,
            },
            ratings: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const Product = mongoose.model("Product", Schema);