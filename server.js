const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// dotenv config
dotenv.config();

// MongoDB connection
connectDB();


// Express app instance
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// CORS setup: allow frontend access
app.use(cors({
  origin: ["http://localhost:3000", "http://15.206.122.239:3000"], // ✅ allow local + deployed frontend
  credentials: true,
}));

// Debug test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// Routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

// Port
const port = process.env.PORT || 8082;

// Start server


app.listen(port, () => {
  console.log(
    `🚀 Server Running in ${process.env.NODE_ENV || "development"} mode on port ${port}`
      .bgCyan.white
  );
});
