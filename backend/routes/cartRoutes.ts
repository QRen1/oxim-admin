// routes/cartRoutes.ts
import express from "express";
import { addToCart } from "../controllers/cartController";

const router = express.Router();

router.post("/addToCart", addToCart);

export default router;
