{/* This is the products page. */}

import "../../index.css";
import AuthPrompt from "../components/promptLogin";
import NavBar from "../components/navbar.jsx";

function Products() {
  return (
    <>
      <AuthPrompt />
      <NavBar />
      <p>this is the products page</p>
    </>
  );
}

export default Products;