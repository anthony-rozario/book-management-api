import React from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/bookForm";

export default function AddBook() {
  const navigate = useNavigate();

  const handleAddBook = async (formData) => {
    try {
      const res = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add book");

      const data = await res.json();
      alert("Book added successfully!");
      navigate(`/book/${data._id}`);
    } catch (err) {
      console.error("Add book failed:", err);
      alert("Error adding book.");
    }
  };

  return (
    <div>
      <BookForm isEdit={false} onSubmit={handleAddBook} />
    </div>
  );
}
