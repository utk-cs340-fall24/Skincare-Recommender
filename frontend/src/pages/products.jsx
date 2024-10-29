{
  /* This is the products page. */
}

import "../../index.css";
import AuthPrompt from "../components/promptLogin";
import NavBar from "../components/navbar.jsx";

import React, { useState, useEffect } from "react";
import ProductDetailsModal from "../components/productModal";

function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  // States for filters
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState(""); // Change to a string
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedSkinType, setSelectedSkinType] = useState(0);
  const [selectedSkinConcerns, setSelectedSkinConcerns] = useState(0);

  useEffect(() => {
    // Fetch products from your backend
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to open modal with selected product details
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleIngredientChange = (e) => {
    const value = e.target.value;

    // Update the selected ingredient directly
    setSelectedIngredients(value); // Store the currently selected ingredient
  };

  useEffect(() => {
    let filtered = products;

    const minPrice = priceRange.min !== "" ? parseFloat(priceRange.min) : null;
    const maxPrice = priceRange.max !== "" ? parseFloat(priceRange.max) : null;

    if (minPrice !== null || maxPrice !== null) {
      filtered = filtered.filter((product) => {
        const meetsMin = minPrice === null || product.price >= minPrice;
        const meetsMax = maxPrice === null || product.price <= maxPrice;
        return meetsMin && meetsMax;
      });
    }
    if (selectedBrands.length) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (!selectedIngredients) {
      // If no ingredient is selected, display all products
      filtered = products; // Reset filtered to show all products
    } else {
      // Filter based on the selected ingredient
      filtered = filtered.filter((product) =>
        product.ingredients.includes(selectedIngredients)
      );
    }

    if (selectedRating) {
      filtered = filtered.filter(
        (product) => product.rating >= parseFloat(selectedRating)
      );
    }

    if (selectedSkinType) {
      filtered = filtered.filter(
        (product) => (product.skinType & selectedSkinType) === selectedSkinType
      );
    }

    if (selectedSkinConcerns) {
      filtered = filtered.filter(
        (product) =>
          (product.concerns & selectedSkinConcerns) === selectedSkinConcerns
      );
    }

    if (sortOption === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating-desc") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [
    priceRange,
    selectedBrands,
    selectedIngredients, // Now a string
    selectedRating,
    selectedSkinType,
    selectedSkinConcerns,
    sortOption,
    products,
  ]);

  return (
    <>
    <AuthPrompt />
    <NavBar /><div className="min-h-screen w-full bg-customCream">
        <div className="container mx-auto px-6 py-12">
          {/* Products Title */}
          <div className="absolute top-28 left-11 text-customBlue text-inknut text-3xl font-black">
            Products
          </div>

          {/* Filter/Sort Controls */}
          <div className="mt-20 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-customGray text-inclusive text-lg font-normal">
                <label htmlFor="sortOptions">Sort:</label>
                <select
                  id="sortOptions"
                  onChange={(e) => setSortOption(e.target.value)}
                  className="ml-2 p-1 border rounded"
                >
                  <option value="">Select</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="rating-desc">Rating (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col">
                <label>Price Range:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: e.target.value })
                    }
                    className="border rounded px-2 py-1 w-1/2"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: e.target.value })
                    }
                    className="border rounded px-2 py-1 w-1/2"
                  />
                </div>
              </div>
              <div>
                <label>Brand:</label>
                <select
                  onChange={(e) => setSelectedBrands(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="">All Brands</option>
                  <option value="BrandA">Brand A</option>
                  <option value="BrandB">Brand B</option>
                </select>
              </div>

              <div>
                <label htmlFor="ingredient-select">Ingredients:</label>
                <select
                  id="ingredient-select"
                  onChange={handleIngredientChange}
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="">All Ingredients</option>
                  <option value="Salicylic Acid">Salicylic Acid</option>
                  <option value="Aloe Vera">Aloe Vera</option>
                  <option value="Hyaluronic Acid">Hyaluronic Acid</option>
                  <option value="Vitamin C">Vitamin C</option>
                  <option value="Niacinamide">Niacinamide</option>
                  <option value="Tea Tree Oil">Tea Tree Oil</option>
                  <option value="Retinol">Retinol</option>
                </select>
              </div>

              <div>
                <label>Rating:</label>
                <select
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="">All Ratings</option>
                  <option value="4">4+</option>
                  <option value="3">3+</option>
                </select>
              </div>

              <div>
                <label>Skin Type:</label>
                <select
                  onChange={(e) =>
                    setSelectedSkinType(parseInt(e.target.value))
                  }
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="0">All Skin Types</option>
                  <option value="1">Dry</option>
                  <option value="2">Oily</option>
                  <option value="4">Sensitive</option>
                </select>
              </div>

              <div>
                <label>Skin Concern:</label>
                <select
                  onChange={(e) =>
                    setSelectedSkinConcerns(parseInt(e.target.value))
                  }
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="0">All Concerns</option>
                  <option value="1">Acne</option>
                  <option value="2">Wrinkles</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 text-customGray">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="p-4 border bg-white rounded-lg shadow-md hover:shadow-lg"
              >
                <div className="flex justify-center items-center w-[272px] h-[270px] overflow-hidden">
                  <img
                    src="./src/images/productplaceholder.png"
                    alt={product.name}
                    className="object-contain max-w-full max-h-full rounded-lg"
                  />
                </div>
                <div className="text-inclusive text-lg font-normal">
                  <p className="text-center cursor-pointer" onClick={() => openModal(product)}>{product.name}</p>
                  <p className="text-center text-customGray">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {isModalOpen && selectedProduct && (
          <ProductDetailsModal product={selectedProduct} onClose={closeModal} />
        )}
        </div>
      </div>
    </>
  );
}

export default ProductPage;
