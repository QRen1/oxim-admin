"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deleteController_1 = require("../controllers/deleteController");
const router = express_1.default.Router();
router.delete("/:id", deleteController_1.deleteMenuItem);
exports.default = router;
