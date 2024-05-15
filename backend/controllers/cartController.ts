// controllers/cartController.ts
import { Request, Response } from "express";
import { CartItem } from "../models/cartItemModel";
import { MenuItem } from "../models/menuItemModel";

// Function to add item to cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { menuItemId } = req.body;

    // Fetch the corresponding MenuItem
    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Create a new cart item with details from the menu item
    const cartItem = await CartItem.create({
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
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};
