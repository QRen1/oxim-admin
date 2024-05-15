// models/menuItemModel.ts
import mongoose, { Document, Schema } from "mongoose";

export interface MenuItemInterface extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

const MenuItemSchema: Schema = new mongoose.Schema({
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
});

export const MenuItem = mongoose.model<MenuItemInterface>(
  "MenuItem",
  MenuItemSchema
);
