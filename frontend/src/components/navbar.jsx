{/* This is the navigation bar Component. 
This component allows the navigation bar to be easily placed on multiple pages */}

import React from "react";
import SearchBar from "./searchbar";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
    const [query, setQuery] = useState("");
    function handleUpdate(value) {
        setQuery(value);
        console.log(value);
    }
    return (
        <nav className="bg-customBlue py-4 max-w-8xl px-8">
            <div className="flex justify-between items-center">
                {/* Place logo on left side of navigation bar and is also acts as the home button */}
                <Link to="/" className="text-customCream text-4xl font-bold font-inknut">SKINrecs</Link>

                {/* Placing the search bar in the center */}
                <div className="flex ml-[10%] mr-[5%] w-1/3">
                    <SearchBar
                        placeholder="Search Products"
                        onSearch={handleUpdate}
                        searchValue={query}
                    ></SearchBar>
                </div>

                {/* Links to other pages on the right of the navigation bar */}
                <div className="flex items-center space-x-10 text-customGray font-small">
                    <Link to="/products" className="hover:text-customDarkGray">Products</Link>
                    <Link to="/quiz" className="hover:text-customDarkGray">Quiz</Link>
                    <a href="#" className="hover:text-customDarkGray flex items-center space-x-2">
                        {/* Makes the icon and darkens the color of it when hovering over it */}
                        <svg className="h-6 w-6 text-customGray hover:text-customDarkGray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;