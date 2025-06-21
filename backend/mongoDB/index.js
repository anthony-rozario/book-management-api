// index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); // ✅ must be above to use in static

dotenv.config();

const app = express();

// Serve static image files before routes
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅ move this up

app.use(cors());
app.use(express.json());

const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes); // API routes

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
