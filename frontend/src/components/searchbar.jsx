import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ term, change, submit }) => {
  return (
    <form onSubmit={(e) => submit(e)} className="w-full">
      <input
        type="text"
        value={term}
        onChange={change}
        onKeyDown={(e) => e.key === "Enter" && submit(e)}
        className={
          "bg-white text-customLightGray font-bold py-2 px-6 rounded-full transition shadow-md w-full"
        }
        placeholder={"Search Products"}
      />
    </form>
  );
};

SearchBar.propTypes = {
  term: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default SearchBar;
