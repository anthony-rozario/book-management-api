// editbook.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";

export default function EditBook() {
  const { id } = useParams(); // _id is already available here
  console.log("EditBook component _id params:", id);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        setLoading(false);
      });
  }, [id]);

console.log("EditBook component rendered with _id:", id); // Debugging line to check _id
console.log("Fetched book data:", book); // Debugging line to check fetched book data

  // Modify handleUpdateBook to only accept formData
  const handleUpdateBook = async (formData) => { // Removed _id from parameters
    try {
      const res = await fetch(`http://localhost:5000/api/books/${id}`, { // Use _id from useParams
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update book");

      alert("Book updated successfully!");
      // navigate to list or detail page
    } catch (err) {
      console.error(err);
      alert("Error updating book.");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading book...</div>;
  if (!book) return <div className="text-center mt-20">Book not found</div>;

  return <BookForm isEdit={true} initialData={book} onSubmit={(formData) => handleUpdateBook(formData)} />;
}