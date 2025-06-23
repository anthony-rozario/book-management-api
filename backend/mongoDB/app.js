// app.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅ static before JSON
app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes); // API routes

module.exports = app;