import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <div className="w-full bg-white flex border-b border-gray-300">
       <nav className="flex w-full items-center justify-between p-4 shadow-md">
        <div className="flex items-center gap-4">
        <img src="/books.svg" alt="logo" className="max-h-12"/>
        <div>
            <p className="text-gray-400 text-xs">Books</p>
            <h1 className="text-xl tracking-widest">Valley</h1>
        </div>
        </div>
        <Link className="rounded-full bg-blue-400 hover:bg-blue-500 p-3 text-white font-bold cursor-pointer" to={"/add-book"}>Add Books</Link>
        </nav>
       </div>
  )}