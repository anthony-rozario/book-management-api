export default function Navbar() {
  return (
    <div className="w-full bg-transparent relative flex">
       <nav className="flex items-center justify-between p-6 shadow-md">
        <img src="/books.svg" alt="logo" className="max-h-12"/>
        <div>
            <p className="text-gray-400">Books</p>
            <h1 className="text-xl">Valley</h1>
        </div>
       </nav>
       <div>
        <nav className="flex items-center justify-between flex-wrap bg-white p-6 shadow-md absolute top-[50%] left-[50%] transform translate-[50%] gap-4">
            <button>Books</button>
            <button>Add Books</button>
        </nav>
       </div>
        
      </div>
  )}