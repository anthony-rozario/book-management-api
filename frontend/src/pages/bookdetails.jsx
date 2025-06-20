import React from "react";
import { useParams, useLocation } from "react-router-dom";
import books from "../data/data.js";

export default function BookDetails() {
  const { id } = useParams(); // this is the ISBN passed in URL
  const location = useLocation();

  // If passed via state (normal navigation), use it
  const passedBook = location.state;

  // Fallback: Find from book list (if user directly visited the page)
  const book = passedBook || books.find((b) => b.isbn === id);

  if (!book) {
    return (
      <div className="text-center text-gray-600 mt-20">
        Book not found for ISBN: {id}
      </div>
    );
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden justify-center  ">
      <div className="container px-5 py-24 mx-auto ">
        <div className="lg:w-4/5 mx-auto flex flex-wrap border-2 border-gray-200">
        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 justify-center">
          <img
            alt={book.title}
            className="lg:w-1/2 w-56 lg:h-auto h-64 object-cover object-center rounded"
            src={book.image}
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
            <div className="flex mb-4">
              <span className="flex items-center text-yellow-500">
                {"★".repeat(Math.floor(book.rating))}
                {"☆".repeat(5 - Math.floor(book.rating))}
                <span className="text-gray-600 ml-3">
                  {book.reviews} Reviews
                </span>
              </span>
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
              <button className="flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded">
                Edit Book
              </button>
              <button className="ml-4 text-gray-600 border border-gray-300 py-2 px-6 hover:bg-gray-100 rounded">
                Delete Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
