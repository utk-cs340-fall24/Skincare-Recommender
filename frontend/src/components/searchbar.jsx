// Search Bar Component
/** 
* This component renders a reusable search bar
*
* @param {string} placeholder Dummy text for inside search bar
* @param {function} onSearch Function call to update value
* @param {string} className Optional, defaults to string, otherwise class for CSS
* @param {string} searchValue User input string from search bar
*/
import React from "react";

const SearchBar = ({ placeholder, onSearch, className, searchValue }) => {
  return (
    <input
      type="text"
      className={
        className ??
        "bg-white text-[#374151] font-bold py-2 px-6 rounded-full transition shadow-md"
      }
      value={searchValue}
      placeholder={placeholder}
      onChange={(e) => {
        onSearch(e.target.value);
      }}
    />
  );
};

export default SearchBar;