import SearchBar from "./components/searchbar";
import { useState } from "react";
import "./index.css";

function App() {
  // example usage of search bar
  const [query, setQuery] = useState("");
  function handleUpdate(value) {
    setQuery(value);
    console.log(value); // check console for proof it worked
  }
  return (
    <>
      <SearchBar
        placeholder="search for products"
        onSearch={handleUpdate}
        searchValue={query}
      ></SearchBar>
    </>
  );
}

export default App;