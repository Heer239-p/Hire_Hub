import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import routes from "./src/routes/index.js"; // ✅ Import consolidated routes

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("src/uploads"));

// Use consolidated routes
app.use("/api", routes);

// ✅ Default test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ API is running successfully!",
  });
});

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running at: http://localhost:${PORT}`)
);
