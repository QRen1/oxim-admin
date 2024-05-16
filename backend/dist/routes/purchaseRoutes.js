"use strict";
// routes/purchaseRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchaseController_1 = require("../controllers/purchaseController");
const router = express_1.default.Router();
router.get("/", purchaseController_1.getPurchases);
router.get("/:id", purchaseController_1.getPurchaseById);
router.put("/:id", purchaseController_1.updatePurchaseStatus);
exports.default = router;
