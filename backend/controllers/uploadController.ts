import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { MenuItem } from "../models/menuItemModel";

const tempDir = path.join(__dirname, "temp");

// Create the directory if it doesn't exist
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const { name, description, price, category } = req.body;
    const tempFilePath = path.join(tempDir, req.file.originalname);

    fs.writeFileSync(tempFilePath, req.file.buffer);

    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "menu-item",
    });

    // Delete the temporary file
    fs.unlinkSync(tempFilePath);

    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      category,
      imageUrl: result.secure_url,
    });

    console.log("Menu item uploaded:", menuItem);

    res.send("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading menu item:", error);

    res.status(500).send("Failed to upload menu item");
  }
};
