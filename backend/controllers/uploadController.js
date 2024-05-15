"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const menuItemModel_1 = require("../models/menuItemModel");
const tempDir = path_1.default.join(__dirname, "temp");
// Create the directory if it doesn't exist
if (!fs_1.default.existsSync(tempDir)) {
    fs_1.default.mkdirSync(tempDir);
}
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            throw new Error("No file uploaded");
        }
        const { name, description, price, category } = req.body;
        const tempFilePath = path_1.default.join(tempDir, req.file.originalname);
        fs_1.default.writeFileSync(tempFilePath, req.file.buffer);
        const result = yield cloudinary_1.v2.uploader.upload(tempFilePath, {
            folder: "menu-item",
        });
        // Delete the temporary file
        fs_1.default.unlinkSync(tempFilePath);
        const menuItem = yield menuItemModel_1.MenuItem.create({
            name,
            description,
            price,
            category,
            imageUrl: result.secure_url,
        });
        console.log("Menu item uploaded:", menuItem);
        res.send("File uploaded successfully");
    }
    catch (error) {
        console.error("Error uploading menu item:", error);
        res.status(500).send("Failed to upload menu item");
    }
});
exports.uploadController = uploadController;
