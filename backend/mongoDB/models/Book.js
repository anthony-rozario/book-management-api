const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number},
  isbn: { type: String },
  description: { type: String },
  image: { type: String }, // URL to cover image
  publisher: { type: String },
  rating: { type: Number },
  reviews: { type: Number },
  genres: [{ type: String }],
}, {
  timestamps: true
});

module.exports = mongoose.model("Book", bookSchema);