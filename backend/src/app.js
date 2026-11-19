const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const walletRoutes = require("./routes/walletRoutes");

const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Common middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FitPod Backend API is running",
  });
});

// Database health check
app.get("/api/health", async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT NOW() AS server_time, current_database() AS database_name"
    );

    res.json({
      success: true,
      message: "Database connected successfully",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// API routes
app.use("/api/wallet", walletRoutes);

// Error handling (keep these at the bottom)
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;