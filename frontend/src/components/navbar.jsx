import { useState } from "react";
import SearchBar from "./searchbar";
import { Link } from "react-router-dom";
import { Spin as Hamburger } from "hamburger-react";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function handleUpdate(value) {
    setQuery(value);
    console.log(value);
  }

  return (
    <header className="bg-customBlue md:flex md:justify-between md:items-center md:px-4 md:py-3">
      <div className="flex items-center justify-between px-4 py-3 md:p-0">
        <Link
          to="/"
          className="text-customCream text-4xl font-bold font-inknut"
        >
          SKINrecs
        </Link>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="block text-customGray focus:text-customDarkGray focus:outline-none"
          >
            <Hamburger toggled={isOpen} toggle={setIsOpen}/>
          </button>
        </div>
      </div>

      <div className="md:flex-grow md:px-[5vh] hidden md:flex ml-[10%] mr-[5%] w-1/3">
        <SearchBar
          placeholder="Search Products"
          onSearch={handleUpdate}
          searchValue={query}
        />
      </div>

      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } px-2 pt-2 pb-12 md:pb-2 md:flex md:items-center md:ml-auto`}
      >
        <div className="block md:hidden px-2 py-1 text-customGray font-semibold rounded">
          <SearchBar
            placeholder="Search Products"
            onSearch={handleUpdate}
            searchValue={query}
          />
        </div>
        <Link
          to="/products"
          className="block px-2 py-1 text-customGray font-semibold rounded text-right"
        >
          Products
        </Link>
        <Link
          to="/quiz"
          className="mt-1 block px-2 py-1 text-customGray font-semibold rounded text-right md:mt-0 md:ml-2"
        >
          Quiz
        </Link>
        <div className="mt-1 block px-2 py-1 absolute right-2 md:relative md:mt-0 md:ml-2">
          <a href="#" className="text-customDarkGray hover:text-customGray">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}
