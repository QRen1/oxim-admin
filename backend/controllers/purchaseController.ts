// controllers/purchaseController.ts

import { Request, Response } from "express";
import Purchase from "../models/purchaseModel";

export const getPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updatePurchaseStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    purchase.status = status;
    await purchase.save();
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
