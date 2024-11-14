{
  /* This is the products page. */
}

import "../../index.css";
import AuthPrompt from "../components/promptLogin";
import NavBar from "../components/navbar.jsx";

import { useState, useEffect } from "react";
import ProductDetailsModal from "../components/productModal";
import {
  SKIN_CONCERNS,
  SKIN_TYPES,
  PRODUCT_CATEGORIES,
} from "../../../shared/utils/constants.js";

const brandList = [
  "ALGENIST",
  "AMOREPACIFIC",
  "BELIF",
  "BIOSSANCE",
  "BOSCIA",
  "CAUDALIE",
  "CHARLOTTE TILBURY",
  "CLARINS",
  "CLINIQUE",
  "DR. BRANDT SKINCARE",
  "DR. DENNIS GROSS SKINCARE",
  "DR. JART+",
  "DRUNK ELEPHANT",
  "ERBORIAN",
  "FARMACY",
  "FARSALI",
  "FIRST AID BEAUTY",
  "FRESH",
  "GLAMGLOW",
  "GLOW RECIPE",
  "IT COSMETICS",
  "JOSIE MARAN",
  "KIEHL'S SINCE 1851",
  "KORRES",
  "KORA ORGANICS",
  "LANCOME",
  "LANCER",
  "LA MER",
  "LANEIGE",
  "MILK MAKEUP",
  "MURAD",
  "NARS",
  "OLEHENRIKSEN",
  "ORIGINS",
  "PETER THOMAS ROTH",
  "PHILOSOPHY",
  "PERRICONE MD",
  "REN CLEAN SKINCARE",
  "SHISEIDO",
  "SMASHBOX",
  "SUNDAY RILEY",
  "TARTE",
  "TATCHA",
  "TOO FACED",
  "YOUTH TO THE PEOPLE",
];

function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 400 });
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedSkinType, setSelectedSkinType] = useState(0);
  const [selectedSkinConcerns, setSelectedSkinConcerns] = useState(0);
  const [selectedProductCat, setSelectedProductCat] = useState(0);

  useEffect(() => {
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

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleIngredientChange = (e) => {
    const value = e.target.value;
    setSelectedIngredients(value);
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption((prevSortOption) => {
      return prevSortOption === newSortOption ? "" : newSortOption;
    });
  };

  const handleSkinTypeChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedSkinType((prev) =>
      e.target.checked ? prev | value : prev & ~value
    );
  };

  const handleSkinConcernsChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedSkinConcerns((prev) =>
      e.target.checked ? prev | value : prev & ~value
    );
  };

  useEffect(() => {
    let filtered = [...products];

    const minPrice = priceRange.min ? parseFloat(priceRange.min) : null;
    const maxPrice = priceRange.max ? parseFloat(priceRange.max) : null;

    if (minPrice || maxPrice) {
      filtered = filtered.filter(
        (product) =>
          (!minPrice || product.price >= minPrice) &&
          (!maxPrice || product.price <= maxPrice)
      );
    }
    if (selectedBrand) {
      filtered = filtered.filter((product) =>
        product.brand === selectedBrand
      );
    }

    if (!selectedIngredients) {
      filtered = products;
    } else {
      filtered = filtered.filter(
        (product) => !product.ingredients.includes(selectedIngredients)
      );
    }

    if (selectedRating) {
      filtered = filtered.filter(
        (product) => product.rating >= parseFloat(selectedRating)
      );
    }

    if (selectedSkinType) {
      filtered = filtered.filter(
        (product) => (product.skinType & selectedSkinType) !== 0
      );
    }

    if (selectedSkinConcerns) {
      filtered = filtered.filter(
        (product) => (product.concerns & selectedSkinConcerns) !== 0
      );
    }

    if (selectedProductCat) {
      filtered = filtered.filter(
        (product) =>
          (product.category & selectedProductCat) === selectedProductCat
      );
    }

    if (sortOption) {
      filtered = filtered.sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "rating-desc") return b.rating - a.rating;
        return 0;
      });
    }

    setFilteredProducts([...filtered]);
  }, [
    priceRange,
    selectedBrand,
    selectedIngredients,
    selectedRating,
    selectedSkinType,
    selectedSkinConcerns,
    selectedProductCat,
    sortOption,
    products,
  ]);

  return (
    <>
      {/* <AuthPrompt /> */}
      <NavBar />
      <div className="min-h-screen w-full bg-customCream">
        <div className="container mx-auto px-6 py-12">
          {/* Products Title */}
          <div className="absolute top-28 left-11 text-customBlue text-inknut text-3xl font-black">
            Products
          </div>

          {/* Sort Controls */}
          <div className="mt-20 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-customGray text-inclusive text-lg font-normal">
                <label htmlFor="sortOptions">Sort:</label>
                <select
                  id="sortOptions"
                  onChange={handleSortChange}
                  value={sortOption}
                  className="ml-2 p-1 border rounded"
                >
                  <option value="">Select</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="rating-desc">Rating (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Price Filter */}
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
              {/* Brand Filter */}
              <div className="relative">
                <label htmlFor="brand-select">Brand:</label>
                <select
                  id="brand-select"
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="border rounded px-2 py-1 w-full overflow-y-auto max-h-40"
                >
                  <option value="">All Brands</option>
                  {brandList.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
              {/* Category Filter */}
              <div>
                <label>Category:</label>
                <select
                  onChange={(e) =>
                    setSelectedProductCat(parseInt(e.target.value))
                  }
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="">All Categories</option>
                  <option value={PRODUCT_CATEGORIES.CLEANSER}>Cleanser</option>
                  <option value={PRODUCT_CATEGORIES.MOISTURIZER}>
                    Moisturizer
                  </option>
                  <option value={PRODUCT_CATEGORIES.SUNSCREEN}>
                    Sunscreen
                  </option>
                  <option value={PRODUCT_CATEGORIES.SERUM}>Serum</option>
                  <option value={PRODUCT_CATEGORIES.MASK}>Mask</option>
                  <option value={PRODUCT_CATEGORIES.TONER}>Toner</option>
                  <option value={PRODUCT_CATEGORIES.EXFOLIATOR}>
                    Exfoliator
                  </option>
                  <option value={PRODUCT_CATEGORIES.EYECREAM}>Eye Cream</option>
                </select>
              </div>
              {/* Ingredients Filter */}
              <div>
                <label htmlFor="ingredient-select">Ingredients:</label>
                <select
                  id="ingredient-select"
                  onChange={handleIngredientChange}
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="">All Ingredients</option>
                  <option value="salicylic acid">Salicylic Acid</option>
                  <option value="parfume">Parfume</option>
                  <option value="phenoxyethanol">Phenoxyethanol</option>
                  <option value="alcohol">Alcohol</option>
                  <option value="lavender">Lavender</option>
                  <option value="iron oxides">Iron Oxides</option>
                  <option value="xanthan gum">Xanthan Gum</option>
                  <option value="benzyl benzoate">Benzyl Benzoate</option>
                  <option value="limonene">Limonene</option>
                  <option value="linalool">Linalool</option>
                </select>
              </div>
              {/* Rating Filter */}
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
              {/* Skin Type Filter */}
              <div>
                <label>Skin Type:</label>
                {Object.keys(SKIN_TYPES).map((key) => {
                  const value = SKIN_TYPES[key];
                  return (
                    <div key={key}>
                      <input
                        type="checkbox"
                        value={value}
                        id={key.toLowerCase()}
                        onChange={handleSkinTypeChange}
                      />
                      <label htmlFor={key.toLowerCase()}>{key}</label>
                    </div>
                  );
                })}
              </div>
              {/* Skin Concerns Filter */}
              <div>
                <label>Skin Concerns:</label>
                {Object.keys(SKIN_CONCERNS).map((key) => {
                  const value = SKIN_CONCERNS[key];
                  return (
                    <div key={key}>
                      <input
                        type="checkbox"
                        value={value}
                        id={key.toLowerCase()}
                        onChange={handleSkinConcernsChange}
                      />
                      <label htmlFor={key.toLowerCase()}>{key}</label>
                    </div>
                  );
                })}
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
                  <p
                    className="text-center cursor-pointer"
                    onClick={() => openModal(product)}
                  >
                    {product.name}
                  </p>
                  <p className="text-center text-customGray">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Modal Control */}
          {isModalOpen && selectedProduct && (
            <ProductDetailsModal
              product={selectedProduct}
              onClose={closeModal}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProductPage;
