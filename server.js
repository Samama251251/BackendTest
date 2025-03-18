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
    origin: ["https://your-frontend-domain.com", "http://localhost:3000"],
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

// Seed initial data (you can remove this after initial setup)
app.post("/api/seed", async (req, res) => {
  try {
    const initialData = {
      activeUsers: 156,
      pageViews: [
        25, 42, 38, 45, 30, 52, 48, 33, 41, 37, 44, 50, 55, 35, 28, 46, 51, 39,
        43, 36, 47, 53, 40, 34, 49, 45, 38, 42, 37, 44,
      ],
      metrics: {
        users: { value: "23K", change: "+2.15%", positive: true },
        sessions: { value: "28K", change: "+3.42%", positive: true },
        bounceRate: { value: "58.32%", change: "+10.25%", positive: false },
        sessionDuration: { value: "2m 15s", change: "-15.8%", positive: false },
      },
      devices: {
        desktop: 45,
        tablet: 15,
        mobile: 40,
      },
      sources: [
        { name: "Direct", value: 35 },
        { name: "Organic", value: 28 },
        { name: "Email", value: 18 },
        { name: "Referral", value: 12 },
        { name: "Social", value: 7 },
      ],
      topPages: [
        { name: "/home", visits: 892 },
        { name: "/features", visits: 756 },
        { name: "/electronics/smart-watch-pro-2024", visits: 684 },
        { name: "/electronics/gaming-console-elite", visits: 623 },
        { name: "/electronics/fitness-tracker-premium", visits: 589 },
        { name: "/electronics/wireless-earbuds-pro", visits: 542 },
        { name: "/electronics/smart-home-hub", visits: 498 },
        { name: "/electronics/laptop-ultrabook", visits: 467 },
      ],
      moreStats: {
        visits: { value: "67K", label: "Total visits" },
        percentage: { value: "52.8%", label: "Conversion rate" },
      },
    };

    await Dashboard.create(initialData);
    res.json({ message: "Initial data seeded successfully" });
  } catch (error) {
    console.error("Error seeding data:", error);
    res.status(500).json({ message: "Error seeding data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
