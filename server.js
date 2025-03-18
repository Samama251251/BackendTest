import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Dashboard } from "./models/Dashboard.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/api/dashboard", async (req, res) => {
  try {
    // Get the latest dashboard data
    const dashboardData = await Dashboard.findOne().sort({ createdAt: -1 });

    if (!dashboardData) {
      return res.status(404).json({ message: "No dashboard data found" });
    }

    res.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
