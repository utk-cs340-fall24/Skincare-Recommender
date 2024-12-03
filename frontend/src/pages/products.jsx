import { useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "../components/navbar";
import AuthPrompt from "../components/promptLogin";
import ProductDetailsModal from "../components/productModal";
import {
  SKIN_CONCERNS,
  SKIN_TYPES,
  PRODUCT_CATEGORIES,
} from "../../../shared/utils/constants.js";
import { useUser } from "../hooks/useUser.jsx";

function ProductsPage() {
  const { user, loading, error } = useUser();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [brands, setBrands] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    ingredient: "",
    minRating: "",
    skinTypes: [],
    skinConcerns: [],
  });

  const [expandedFilters, setExpandedFilters] = useState({
    brand: false,
    price: false,
    category: false,
    ingredient: false,
    rating: false,
    skinType: false,
    skinConcerns: false,
  });

  const [sortOption, setSortOption] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 24;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/products");
        const data = await response.json();
        setProducts(data);

        const uniqueBrands = [
          ...new Set(data.map((product) => product.brand)),
        ].sort();
        setBrands(uniqueBrands);

        const allIngredients = data.flatMap((product) => product.ingredients);
        const uniqueIngredients = [...new Set(allIngredients)]
          .filter((ing) => ing)
          .sort((a, b) => a.localeCompare(b));
        setIngredients(uniqueIngredients);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Advanced filtering logic
  const applyFilters = useMemo(() => {
    let filtered = products.filter((product) => {
      // Search term filter
      if (
        searchTerm &&
        !product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      if (filters.brand && product.brand !== filters.brand) return false;

      const minPrice = filters.minPrice ? parseFloat(filters.minPrice) : 0;
      const maxPrice = filters.maxPrice
        ? parseFloat(filters.maxPrice)
        : Infinity;
      if (product.price < minPrice || product.price > maxPrice) return false;

      if (filters.category && product.category !== parseInt(filters.category))
        return false;

      if (
        filters.ingredient &&
        !product.ingredients.some((ing) => ing.includes(filters.ingredient))
      )
        return false;

      if (filters.minRating && product.rating < parseFloat(filters.minRating))
        return false;

      if (filters.skinTypes.length > 0) {
        const skinTypeMatch = filters.skinTypes.some(
          (type) => (product.skinType & type) !== 0
        );
        if (!skinTypeMatch) return false;
      }

      if (filters.skinConcerns.length > 0) {
        const concernsMatch = filters.skinConcerns.some(
          (concern) => (product.concerns & concern) !== 0
        );
        if (!concernsMatch) return false;
      }

      return true;
    });

    if (sortOption === "price-asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating-asc") {
      filtered = filtered.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === "rating-desc") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [products, filters, sortOption, searchTerm]);

  useEffect(() => {
    setFilteredProducts(applyFilters);
  }, [applyFilters]);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredProducts.length);
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const visiblePages = Math.min(5, totalPages); // Show at most 5 pages
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to page 1 when changing page size
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const updateFilter = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const toggleMultiSelectFilter = (filterName, value) => {
    setFilters((prev) => {
      const currentValues = prev[filterName];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterName]: newValues };
    });
  };

  const toggleFilterExpand = (section) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      brand: "",
      minPrice: "",
      maxPrice: "",
      category: "",
      ingredient: "",
      minRating: "",
      skinTypes: [],
      skinConcerns: [],
    });
    setSearchTerm("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <AuthPrompt />
      <Navbar onSearch={(term) => setSearchTerm(term)} user={user} />
      <div className="bg-gray-50 pt-[30px]">
        <div className="container mx-auto  py-8">
          <div className="pt-[60px] grid grid-cols-[2fr_10fr]">
            {/* Filters Sidebar */}
            <div className="w-64 pr-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </button>
              </div>

              {/* Brand Filter */}
              <div className="border-b pb-4">
                <div
                  onClick={() => toggleFilterExpand("brand")}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <h3 className="font-semibold">Brand</h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedFilters.brand ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFilters.brand && (
                  <select
                    value={filters.brand}
                    onChange={(e) => updateFilter("brand", e.target.value)}
                    className="w-full mt-2 p-2 border rounded"
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Price Filter */}
              <div className="border-b pb-4">
                <div
                  onClick={() => toggleFilterExpand("price")}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <h3 className="font-semibold">Price</h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedFilters.price ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFilters.price && (
                  <div className="flex space-x-2 mt-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => updateFilter("minPrice", e.target.value)}
                      className="w-1/2 p-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilter("maxPrice", e.target.value)}
                      className="w-1/2 p-2 border rounded"
                    />
                  </div>
                )}
              </div>

              {/* Category Filter */}
              <div className="border-b pb-4">
                <div
                  onClick={() => toggleFilterExpand("category")}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <h3 className="font-semibold">Category</h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedFilters.category ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFilters.category && (
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilter("category", e.target.value)}
                    className="w-full mt-2 p-2 border rounded"
                  >
                    <option value="">All Categories</option>
                    {Object.entries(PRODUCT_CATEGORIES).map(([key, value]) => (
                      <option key={key} value={value}>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Ingredient Filter */}
              <div className="border-b pb-4">
                <div
                  onClick={() => toggleFilterExpand("ingredient")}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <h3 className="font-semibold">Ingredient</h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedFilters.ingredient ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFilters.ingredient && (
                  <select
                    value={filters.ingredient}
                    onChange={(e) => updateFilter("ingredient", e.target.value)}
                    className="w-full mt-2 p-2 border rounded"
                  >
                    <option value="">All Ingredients</option>
                    {ingredients.map((ingredient) => (
                      <option key={ingredient} value={ingredient}>
                        {ingredient}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Rating Filter */}
              <div className="border-b pb-4">
                <div
                  onClick={() => toggleFilterExpand("rating")}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <h3 className="font-semibold">Rating</h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedFilters.rating ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFilters.rating && (
                  <select
                    value={filters.minRating}
                    onChange={(e) => updateFilter("minRating", e.target.value)}
                    className="w-full mt-2 p-2 border rounded"
                  >
                    <option value="">All Ratings</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                  </select>
                )}
              </div>

              {/* Skin Type Filter */}
              <div className="border-b pb-4">
                <div
                  onClick={() => toggleFilterExpand("skinType")}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <h3 className="font-semibold">Skin Type</h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedFilters.skinType ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFilters.skinType && (
                  <div className="mt-2 space-y-1">
                    {Object.entries(SKIN_TYPES).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`skinType-${key}`}
                          value={value}
                          checked={filters.skinTypes.includes(value)}
                          onChange={() =>
                            toggleMultiSelectFilter("skinTypes", value)
                          }
                          className="mr-2"
                        />
                        <label htmlFor={`skinType-${key}`}>{key}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Skin Concerns Filter */}
              <div className="border-b pb-4">
                <div
                  onClick={() => toggleFilterExpand("skinConcerns")}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <h3 className="font-semibold">Skin Concerns</h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedFilters.skinConcerns ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFilters.skinConcerns && (
                  <div className="mt-2 space-y-1">
                    {Object.entries(SKIN_CONCERNS).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`skinConcern-${key}`}
                          value={value}
                          checked={filters.skinConcerns.includes(value)}
                          onChange={() =>
                            toggleMultiSelectFilter("skinConcerns", value)
                          }
                          className="mr-2"
                        />
                        <label htmlFor={`skinConcern-${key}`}>{key}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              {/* Products Grid */}
              <div className="flex-1">
                <div className="flex justify-end mb-4">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="">Sort By</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-asc">Rating: Low to High</option>
                    <option value="rating-desc">Rating: High to Low</option>
                  </select>
                </div>

                <div className="flex-1 overflow-y-auto h-[calc(100vh-60px)]">
                  {currentProducts.length > 0 ? ( // Check if currentProducts has any items
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {currentProducts.map(
                        (
                          product // Map over currentProducts
                        ) => (
                          <div
                            key={product._id}
                            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => openModal(product)}
                          >
                            <div className="h-64 flex items-center justify-center mb-4">
                              <img
                                src={
                                  product.imageUrl ||
                                  "./src/images/productplaceholder.png"
                                }
                                alt={product.name}
                                className="max-h-full object-contain"
                              />
                            </div>
                            <div className="text-center">
                              <h3 className="font-semibold text-lg">
                                {product.name}
                              </h3>
                              <p className="text-gray-600">${product.price}</p>
                              <div className="flex justify-center mt-2">
                                {[...Array(Math.round(product.rating))].map(
                                  (_, i) => (
                                    <span key={i} className="text-yellow-500">
                                      ★
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p>No products found.</p>
                  )}
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                  {currentPage > 1 && (
                    <button
                      onClick={() => handlePageChange(1)}
                      className={`px-3 py-1 mx-1 rounded ${
                        currentPage === 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      disabled={currentPage === 1}
                    >
                      First
                    </button>
                  )}
                  {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 mx-1 rounded ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  {currentPage < totalPages && (
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className={`px-3 py-1 mx-1 rounded ${
                        currentPage === totalPages
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      disabled={currentPage === totalPages}
                    >
                      Last
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Modal */}
        {isModalOpen && selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            onClose={closeModal}
            user={user}
          />
        )}
      </div>
    </>
  );
}

export default ProductsPage;
