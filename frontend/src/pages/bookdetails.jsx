import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => {
        console.error("Error fetching book:", err);
        alert("Book not found or server error.");
      });
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    fetch(`http://localhost:5000/api/books/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          alert("Book deleted successfully!");
          navigate("/");
        } else {
          alert("Failed to delete the book.");
        }
      })
      .catch((err) => console.error("Error deleting book:", err));
  };

  if (!book) {
    return (
      <div className="text-center text-gray-600 mt-20">
        Book not found with ID: {id}
      </div>
    );
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden justify-center m-20">
      <div className="container items-center mx-auto justify-center">
        <div className="lg:w-4/5 mx-auto flex flex-wrap border-2 border-gray-200 bg-white shadow-lg rounded-lg py-12 pr-8">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 flex justify-center items-center">
            <img
              alt={book.title}
              className="w-76 h-auto object-cover object-center rounded"
              src={`http://localhost:5000${book.image}`}
            />
          </div>

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              ISBN: {book.isbn}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {book.title}
            </h1>
            <h3 className="text-gray-600 mb-4 text-lg">by {book.author}</h3>

            <div className="flex gap-4 pb-6">
              <span className="flex items-center text-yellow-500">
                <span className="text-gray-600">Ratings: </span>
                {"★".repeat(Math.floor(book.rating || 0))}
                {"☆".repeat(5 - Math.floor(book.rating || 0))}
              </span>
              <div className="text-gray-600 ml-3">
                Reviewed: {book.reviews}
              </div>
            </div>

            <p className="leading-relaxed text-justify">{book.description}</p>

            <div className="mt-4">
              <h4 className="font-semibold text-gray-700">Publisher:</h4>
              <p className="text-gray-600">{book.publisher}</p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-gray-700">Genres:</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {book.genres.map((genre, idx) => (
                  <span
                    key={idx}
                    className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex mt-6">
              <Link
                to={`/edit-book/${book._id}`}
                className="flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded"
              >
                Edit Book
              </Link>
              <button
                onClick={handleDelete}
                className="ml-4 text-gray-600 border border-gray-300 py-2 px-6 hover:bg-gray-100 rounded"
              >
                Delete Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
