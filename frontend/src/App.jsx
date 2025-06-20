import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
// import AddBook from "./pages/AddBook";
import BookDetails from "./pages/bookdetails";

function App() {
  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-fixed min-h-screen">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        {/*<Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book" element={<EditBook />} />
        */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
