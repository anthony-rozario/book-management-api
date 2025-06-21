import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import BookForm from "./components/bookForm";
import BookDetails from "./pages/bookdetails";
import EditBook from "./pages/editBook";
import AddBook from "./pages/addBook";

function App() {
  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-fixed min-h-screen">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/add-book" element={<AddBook /> } />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="*" element={<div className="text-center text-gray-600 mt-20">Page Not Found</div>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
