import express from "express";
import { deleteMenuItem } from "../controllers/deleteController";

const router = express.Router();

router.delete("/:id", deleteMenuItem);

export default router;
