"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
// models/cartItemModel.ts
const mongoose_1 = __importDefault(require("mongoose"));
const CartItemSchema = new mongoose_1.default.Schema({
    menuItemId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "MenuItem", // Reference to the MenuItem model
        required: true,
    },
    name: {
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
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1, // Default quantity is 1
    },
    status: {
        type: String,
        default: "pending", // Default status is "pending"
    },
});
exports.CartItem = mongoose_1.default.model("CartItem", CartItemSchema);
