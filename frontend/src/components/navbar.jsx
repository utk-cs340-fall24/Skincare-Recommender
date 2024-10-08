import React from "react";
import SearchBar from "./searchbar";
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
                <div className="text-customCream text-4xl font-bold font-inknut">SKINrecs</div>

                <div className="flex ml-[10%] mr-[5%] w-1/3">
                    <SearchBar
                        placeholder="Search Products"
                        onSearch={handleUpdate}
                        searchValue={query}
                    ></SearchBar>
                </div>

                <div className="flex items-center space-x-10 text-customGray font-small">
                    <a href="#" className="hover:text-customDarkGray">About</a>
                    <a href="#" className="hover:text-customDarkGray">Products</a>
                    <a href="#" className="hover:text-customDarkGray">Quiz</a>
                    <a href="#" className="hover:text-customDarkGray flex items-center space-x-2">
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