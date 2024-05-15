import { Request, Response } from "express";
import { MenuItem } from "../models/menuItemModel";

export const imageController = async (req: Request, res: Response) => {
  try {
    const menuItems = await MenuItem.find();
    const imageUrls = menuItems.map((menuItem) => menuItem.imageUrl);
    res.json(imageUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching image URLs" });
  }
};
