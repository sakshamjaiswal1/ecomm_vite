import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "@/store";
import {
  updateCategoryFilter,
  updateBrandFilter,
  updatePriceFilter,
  clearAllFilters,
} from "@/redux/products/reducer";

const categories = [
  { name: "Smartphones", count: 15420, value: "smartphones" },
  { name: "Laptops", count: 8250, value: "laptops" },
  { name: "Tablets", count: 3680, value: "tablets" },
  { name: "Headphones", count: 12500, value: "headphones" },
  { name: "Smart Watches", count: 4920, value: "smartwatches" },
  { name: "Gaming Accessories", count: 2180, value: "gaming" },
];

const brands = [
  { name: "Apple", count: 2450, value: "Apple" },
  { name: "Samsung", count: 3280, value: "Samsung" },
  { name: "OnePlus", count: 1560, value: "OnePlus" },
  { name: "Xiaomi", count: 2890, value: "Xiaomi" },
  { name: "Sony", count: 1840, value: "Sony" },
  { name: "Dell", count: 1230, value: "Dell" },
  { name: "HP", count: 1680, value: "HP" },
  { name: "Lenovo", count: 1420, value: "Lenovo" },
  { name: "Asus", count: 980, value: "Asus" },
  { name: "Acer", count: 750, value: "Acer" },
  { name: "Realme", count: 1150, value: "Realme" },
  { name: "Oppo", count: 920, value: "Oppo" },
];

const colors = [
  { name: "Black", count: 3871 },
  { name: "White", count: 2724 },
  { name: "Blue", count: 2204 },
  { name: "Green", count: 1642 },
];

function FilterSidebar() {
  const dispatch = useDispatch();
  const { data } = useSelector((state: IRootState) => state.products);
  const { appliedFilters } = data;

  const [brandSearch, setBrandSearch] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true,
    color: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const handleCategoryChange = (categoryValue: string, checked: boolean) => {
    let newCategories = [...appliedFilters.categories];

    if (checked) {
      newCategories.push(categoryValue);
    } else {
      newCategories = newCategories.filter((cat) => cat !== categoryValue);
    }

    dispatch(updateCategoryFilter(newCategories));
  };

  const handleBrandChange = (brandValue: string, checked: boolean) => {
    let newBrands = [...appliedFilters.brands];

    if (checked) {
      newBrands.push(brandValue);
    } else {
      newBrands = newBrands.filter((brand) => brand !== brandValue);
    }

    dispatch(updateBrandFilter(newBrands));
  };

  const handlePriceChange = (value: number) => {
    dispatch(
      updatePriceFilter({
        min: appliedFilters.priceRange.min,
        max: value,
      })
    );
  };

  const handleClearFilters = () => {
    dispatch(clearAllFilters());
    setBrandSearch("");
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <div className="w-full lg:w-80 lg:border-r border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="typo-h5-bold text-gray-900">FILTERS</h2>
          {(appliedFilters.categories.length > 0 ||
            appliedFilters.brands.length > 0 ||
            appliedFilters.priceRange.max < 200000) && (
            <button
              onClick={handleClearFilters}
              className="typo-c1-semiBold text-red-500 hover:text-red-600"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("categories")}
            className="flex items-center justify-between w-full py-2 typo-b2-semiBold text-gray-900"
          >
            CATEGORIES
            <svg
              className={`w-4 h-4 transform transition-transform ${
                expandedSections.categories ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {expandedSections.categories && (
            <div className="mt-3 space-y-2">
              {categories.slice(0, 4).map((category) => (
                <label
                  key={category.value}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={appliedFilters.categories.includes(category.value)}
                    onChange={(e) =>
                      handleCategoryChange(category.value, e.target.checked)
                    }
                    className="mr-2 rounded border-gray-300 text-primary-main-500 focus:ring-primary-main-500"
                  />
                  <span className="typo-b3-regular text-gray-700">
                    {category.name}
                  </span>
                  <span className="typo-c1-regular text-gray-500 ml-1">
                    ({category.count})
                  </span>
                </label>
              ))}
              {/* Show more categories on desktop only */}
              <div className="hidden lg:block">
                {categories.slice(4).map((category) => (
                  <label
                    key={category.value}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={appliedFilters.categories.includes(
                        category.value
                      )}
                      onChange={(e) =>
                        handleCategoryChange(category.value, e.target.checked)
                      }
                      className="mr-2 rounded border-gray-300 text-primary-main-500 focus:ring-primary-main-500"
                    />
                    <span className="typo-b3-regular text-gray-700">
                      {category.name}
                    </span>
                    <span className="typo-c1-regular text-gray-500 ml-1">
                      ({category.count})
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Brand */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("brands")}
            className="flex items-center justify-between w-full py-2 typo-b2-semiBold text-gray-900"
          >
            BRAND
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {expandedSections.brands && (
            <div className="mt-3">
              {/* Hide search on mobile */}
              <input
                type="text"
                placeholder="Search brands"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="hidden lg:block w-full px-3 py-2 border border-gray-300 rounded-md typo-b3-regular mb-3 focus:outline-none focus:ring-2 focus:ring-primary-main-500"
              />
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {filteredBrands.slice(0, 6).map((brand) => (
                  <label
                    key={brand.value}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={appliedFilters.brands.includes(brand.value)}
                      onChange={(e) =>
                        handleBrandChange(brand.value, e.target.checked)
                      }
                      className="mr-2 rounded border-gray-300 text-primary-main-500 focus:ring-primary-main-500"
                    />
                    <span className="typo-b3-regular text-gray-700">
                      {brand.name}
                    </span>
                    <span className="typo-c1-regular text-gray-500 ml-1">
                      ({brand.count})
                    </span>
                  </label>
                ))}
              </div>
              {filteredBrands.length > 6 && (
                <button className="typo-b3-semiBold text-primary-main-500 mt-2">
                  + {filteredBrands.length - 6} more
                </button>
              )}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full py-2 typo-b2-semiBold text-gray-900"
          >
            PRICE
          </button>
          {expandedSections.price && (
            <div className="mt-3">
              <div className="flex items-center space-x-2 mb-3">
                <span className="typo-b3-regular text-gray-700">
                  ₹{appliedFilters.priceRange.min}
                </span>
                <div className="flex-1">
                  <input
                    type="range"
                    min={appliedFilters.priceRange.min}
                    max="200000"
                    value={appliedFilters.priceRange.max}
                    onChange={(e) => handlePriceChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <span className="typo-b3-regular text-gray-700">
                  ₹{appliedFilters.priceRange.max.toLocaleString()}+
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Color - Hidden on mobile */}
        <div className="hidden lg:block mb-6">
          <button
            onClick={() => toggleSection("color")}
            className="flex items-center justify-between w-full py-2 typo-b2-semiBold text-gray-900"
          >
            COLOR
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {expandedSections.color && (
            <div className="mt-3 space-y-2">
              {colors.map((color) => (
                <label
                  key={color.name}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-gray-300 text-primary-main-500 focus:ring-primary-main-500"
                  />
                  <div
                    className={`w-4 h-4 rounded-full mr-2 border border-gray-300 ${
                      color.name.toLowerCase() === "black"
                        ? "bg-black"
                        : color.name.toLowerCase() === "white"
                        ? "bg-white"
                        : color.name.toLowerCase() === "blue"
                        ? "bg-blue-500"
                        : color.name.toLowerCase() === "green"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="typo-b3-regular text-gray-700">
                    {color.name}
                  </span>
                  <span className="typo-c1-regular text-gray-500 ml-1">
                    ({color.count})
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
