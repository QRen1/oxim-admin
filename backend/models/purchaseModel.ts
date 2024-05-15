// models/purchaseModel.js

import mongoose, { Document, Schema } from "mongoose";

export interface PurchaseInterface extends Document {
  userId: string;
  cartItems: {
    itemId: mongoose.Types.ObjectId;
    quantity: number;
    imageUrl: string;
    name: string;
  }[];
  totalAmount: number;
  purchaseDate: Date;
  status: string;
  email: string;
  addressLine1: string;
}

const PurchaseSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  cartItems: [
    {
      itemId: {
        type: Schema.Types.ObjectId,
        ref: "CartItem",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
  email: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
});

const Purchase = mongoose.model<PurchaseInterface>("Purchase", PurchaseSchema);
export default Purchase;
