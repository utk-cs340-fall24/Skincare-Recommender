import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Spin as Hamburger } from "hamburger-react";
import ProfileModal from "./profileModal";
import PropTypes from "prop-types";
import SearchBar from "./searchbar";

function Navbar({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const existingSearch = params.get("search");
    if (existingSearch) {
      setSearchTerm(existingSearch);
    }
  }, [location.search]);

  useEffect(() => {
    if (location.pathname === "/products") {
      const handler = setTimeout(() => {
        const params = new URLSearchParams(location.search);
        if (searchTerm !== params.get("search")) {
          params.set("search", searchTerm);
          navigate(`/products?${params.toString()}`, { replace: true });
        }
        onSearch && onSearch(searchTerm);
      }, 200);

      return () => clearTimeout(handler);
    }
  }, [searchTerm, location.pathname, location.search, onSearch, navigate]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== "/products") {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

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
            <Hamburger toggled={isOpen} toggle={setIsOpen} />
          </button>
        </div>
      </div>

      <div className="md:flex-grow md:px-[5vh] hidden md:flex ml-[10%] mr-[5%] w-1/3">
        {/* Searchbar */}
        <SearchBar
          term={searchTerm}
          change={handleSearch}
          submit={handleSubmit}
        />
      </div>

      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } px-2 pt-2 pb-12 md:pb-2 md:flex md:items-center md:ml-auto`}
      >
        <div className="block md:hidden px-2 py-1 text-customGray font-semibold rounded">
          {/* Searchbar */}
          <SearchBar
            term={searchTerm}
            change={handleSearch}
            submit={handleSubmit}
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
          <button
            onClick={toggleModal}
            className="text-customGray hover:text-customDarkGray"
          >
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
          </button>
        </div>
      </nav>

      <ProfileModal isOpen={isModalOpen} onClose={toggleModal} />
    </header>
  );
}

Navbar.propTypes = {
  onSearch: PropTypes.func,
};

export default Navbar;
