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
exports.deleteMenuItem = void 0;
const menuItemModel_1 = require("../models/menuItemModel");
const deleteMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const menuItem = yield menuItemModel_1.MenuItem.findByIdAndDelete(id);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.json({ message: "Menu item deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting menu item:", error);
        res.status(500).send("Failed to delete menu item");
    }
});
exports.deleteMenuItem = deleteMenuItem;
