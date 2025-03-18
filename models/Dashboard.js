import mongoose from "mongoose";

const metricsSchema = new mongoose.Schema({
  users: {
    value: String,
    change: String,
    positive: Boolean,
  },
  sessions: {
    value: String,
    change: String,
    positive: Boolean,
  },
  bounceRate: {
    value: String,
    change: String,
    positive: Boolean,
  },
  sessionDuration: {
    value: String,
    change: String,
    positive: Boolean,
  },
});

const devicesSchema = new mongoose.Schema({
  desktop: Number,
  tablet: Number,
  mobile: Number,
});

const sourceSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

const topPageSchema = new mongoose.Schema({
  name: String,
  visits: Number,
});

const moreStatsSchema = new mongoose.Schema({
  visits: {
    value: String,
    label: String,
  },
  percentage: {
    value: String,
    label: String,
  },
});

const dashboardSchema = new mongoose.Schema(
  {
    activeUsers: Number,
    pageViews: [Number],
    metrics: metricsSchema,
    devices: devicesSchema,
    sources: [sourceSchema],
    topPages: [topPageSchema],
    moreStats: moreStatsSchema,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Dashboard = mongoose.model("Dashboard", dashboardSchema);
