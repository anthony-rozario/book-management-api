import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch books from API
  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  // Filter logic
  const filteredBooks = books.filter(
    (book) =>
      book?.title?.toLowerCase().includes(query.toLowerCase()) ||
      book?.author?.toLowerCase().includes(query.toLowerCase()) ||
      book?.isbn?.includes(query)
  );

  return (
    <section className="text-gray-600 body-font p-20">
      <div className="container px-5 py-16 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Every book has a place — find it here
          </h1>
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-1/2 mx-auto bg-gray-100 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="flex flex-wrap -m-2">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(`/book/${book._id}`, { state: book })
                }
                className="p-2 lg:w-1/3 md:w-1/2 w-full cursor-pointer"
              >
                <div
                  className="h-full flex items-center border border-gray-300 p-4 rounded-lg shadow-md 
                  hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out bg-white"
                >
                  <img
                    alt={book.title}
                    className="w-auto max-h-38 bg-gray-100 object-cover object-center flex-shrink-0 rounded mr-4"
                    src={`http://localhost:5000${book.image}`}
                  />
                  <div className="flex-grow">
                    <p className="text-gray-500 text-xs">ISBN: {book.isbn}</p>
                    <h2 className="text-gray-900 title-font font-medium text-lg">
                      Title: {book.title}
                    </h2>
                    <p className="text-gray-500">Author: {book.author}</p>
                    <p className="text-gray-500">
                      Year of Publish : {book.publishedYear}
                    </p>
                    <div className="flex gap-4 justify-between">
                      <span className="flex items-center text-yellow-500">
                        <span className="text-gray-600 ">Ratings : </span>
                        {"★".repeat(Math.floor(book.rating))}
                        {"☆".repeat(5 - Math.floor(book.rating))}
                        
                      </span>
                      <div className="text-gray-600 ml-3">
                        Reviewed :  {book.reviews}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">
              No books match your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
