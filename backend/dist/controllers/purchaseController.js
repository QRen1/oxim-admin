"use strict";
// controllers/purchaseController.ts
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
exports.updatePurchaseStatus = exports.getPurchaseById = exports.getPurchases = void 0;
const purchaseModel_1 = __importDefault(require("../models/purchaseModel"));
const getPurchases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchases = yield purchaseModel_1.default.find();
        res.status(200).json(purchases);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.getPurchases = getPurchases;
const getPurchaseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchase = yield purchaseModel_1.default.findById(req.params.id);
        if (!purchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }
        res.status(200).json(purchase);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.getPurchaseById = getPurchaseById;
const updatePurchaseStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.body;
    try {
        const purchase = yield purchaseModel_1.default.findById(req.params.id);
        if (!purchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }
        purchase.status = status;
        yield purchase.save();
        res.status(200).json(purchase);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.updatePurchaseStatus = updatePurchaseStatus;
