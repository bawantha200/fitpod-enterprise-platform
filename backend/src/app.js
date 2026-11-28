const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit"); 
const pool = require("./config/db");

const walletRoutes = require("./routes/walletRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");

const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();


app.use(helmet()); 

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options(/.*/, cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});


const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 100, 
  message: { success: false, message: "Too many requests from this IP, please try again later." }
});
app.use("/api", generalLimiter);

const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5, 
  message: { success: false, message: "Too many login attempts. Please try again after a minute." }
});

// ==========================================
// 3. Routes
// ==========================================

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

// API Routes
app.use("/api/wallet", walletRoutes);
app.use("/api/bookings", bookingRoutes);

app.use("/api/auth", authLimiter, authRoutes); 

// ==========================================
// 4. Error Handling
// ==========================================

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;