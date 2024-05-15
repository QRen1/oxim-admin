import express from "express";
import multer from "multer";
import { uploadController } from "../controllers/uploadController";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), uploadController);

export default router;
