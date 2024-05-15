// routes/purchaseRoutes.ts

import express from "express";
import {
  getPurchases,
  getPurchaseById,
  updatePurchaseStatus,
} from "../controllers/purchaseController";

const router = express.Router();

router.get("/", getPurchases);
router.get("/:id", getPurchaseById);
router.put("/:id", updatePurchaseStatus);

export default router;
