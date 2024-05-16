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
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageController = void 0;
const menuItemModel_1 = require("../models/menuItemModel");
const imageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menuItems = yield menuItemModel_1.MenuItem.find();
        const imageUrls = menuItems.map((menuItem) => menuItem.imageUrl);
        res.json(imageUrls);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching image URLs" });
    }
});
exports.imageController = imageController;
