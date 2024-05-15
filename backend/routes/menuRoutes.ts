// menuRoutes.js
import express from "express";
import { MenuItem } from "../models/menuItemModel";

const router = express.Router();

// Route to fetch all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching menu items" });
  }
});

export default router;
