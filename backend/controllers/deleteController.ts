import { Request, Response } from "express";
import { MenuItem } from "../models/menuItemModel";

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByIdAndDelete(id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).send("Failed to delete menu item");
  }
};
