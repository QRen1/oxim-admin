import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import imageRoutes from "../routes/imageRoutes";
import uploadRoutes from "../routes/uploadRoutes";
import menuRoutes from "../routes/menuRoutes";
import deleteRoutes from "../routes/deleteRoutes";
import cartRoutes from "../routes/cartRoutes";
import purchaseRoutes from "../routes/purchaseRoutes";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"))
  .catch((error) => console.error("Database connection error:", error));

app.use("/upload", uploadRoutes);
app.use("/getImage", imageRoutes);
app.use("/menu", menuRoutes);
app.use("/deleteMenuItem", deleteRoutes);
app.use("/cart", cartRoutes);
app.use("/purchases", purchaseRoutes);

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
