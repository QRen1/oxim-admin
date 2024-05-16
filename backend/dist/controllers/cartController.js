"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = void 0;
const cartItemModel_1 = require("../models/cartItemModel");
const menuItemModel_1 = require("../models/menuItemModel");
// Function to add item to cart
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { menuItemId } = req.body;
        // Fetch the corresponding MenuItem
        const menuItem = yield menuItemModel_1.MenuItem.findById(menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        // Create a new cart item with details from the menu item
        const cartItem = yield cartItemModel_1.CartItem.create({
            menuItemId,
            name: menuItem.name,
            description: menuItem.description,
            price: menuItem.price,
            category: menuItem.category,
            imageUrl: menuItem.imageUrl,
            quantity: 1, // You can set the default quantity as needed
            status: "pending", // Set default status to "pending"
        });
        res.status(201).json({ message: "Item added to cart", cartItem });
    }
    catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ message: "Failed to add item to cart" });
    }
});
exports.addToCart = addToCart;
