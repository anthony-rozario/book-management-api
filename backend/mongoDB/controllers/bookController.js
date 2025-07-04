const mongoose = require("mongoose");
const Book = require("../models/Book");

// GET all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET book by ID

exports.getBookById = async (req, res) => {
  const { id } = req.params;

  // ✅ Step 1: Validate ID format before hitting DB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID format" });
  }

  try {
    const book = await Book.findById(id);

    // ✅ Step 2: Handle non-existent book
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    // ✅ Step 3: Log unexpected errors
    console.error("Error fetching book by ID:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST create new book (with optional image upload)
exports.createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      description,
      publisher
    } = req.body;

    let genres = req.body.genres;
    if (typeof genres === "string") {
      genres = [genres];
    } else if (!Array.isArray(genres)) {
      genres = [];
    }

    const rating = parseFloat(req.body.rating) || 0;
    const reviews = parseInt(req.body.reviews) || 0;

    const bookData = {
      title,
      author,
      isbn,
      description,
      publisher,
      rating,
      reviews,
      genres,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    };

    const newBook = new Book(bookData);
    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(400).json({ message: err.message });
  }
};
// Update a book
exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = {
      ...req.body,
    };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    // ✅ Add this check
    if (!updated) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// DELETE a book
exports.deleteBook = async (req, res) => {
  try {
    console.log("🔍 Trying to delete book with ID:", req.params.id);

    const deleted = await Book.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("❌ Delete failed:", err.message);
    res.status(500).json({ message: err.message });
  }
};
