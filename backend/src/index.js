"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const imageRoutes_1 = __importDefault(require("../routes/imageRoutes"));
const uploadRoutes_1 = __importDefault(require("../routes/uploadRoutes"));
const menuRoutes_1 = __importDefault(require("../routes/menuRoutes"));
const deleteRoutes_1 = __importDefault(require("../routes/deleteRoutes"));
const cartRoutes_1 = __importDefault(require("../routes/cartRoutes"));
const purchaseRoutes_1 = __importDefault(require("../routes/purchaseRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Connected to database!"))
    .catch((error) => console.error("Database connection error:", error));
app.use("/upload", uploadRoutes_1.default);
app.use("/getImage", imageRoutes_1.default);
app.use("/menu", menuRoutes_1.default);
app.use("/deleteMenuItem", deleteRoutes_1.default);
app.use("/cart", cartRoutes_1.default);
app.use("/purchases", purchaseRoutes_1.default);
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
