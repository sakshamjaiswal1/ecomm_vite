import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "@/store";
import { updateSortBy } from "@/redux/products/reducer";
import ProductCard from "../ProductCard";

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "What's New" },
  { value: "popularity", label: "Popularity" },
  { value: "price_low_high", label: "Price: Low to High" },
  { value: "price_high_low", label: "Price: High to Low" },
  { value: "customer_rating", label: "Customer Rating" },
  { value: "discount", label: "Better Discount" },
];

function ProductGrid() {
  const dispatch = useDispatch();
  const { data: productsData, isLoading } = useSelector(
    (state: IRootState) => state.products
  );

  const handleSortChange = (sortValue: string) => {
    dispatch(updateSortBy(sortValue));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="typo-h4-regular text-gray-700">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Product Header with Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 gap-4">
        <div>
          <h1 className="typo-h4-bold lg:typo-h3-bold text-gray-900 mb-1">
            Electronics
          </h1>
          <p className="typo-b3-regular text-gray-600">
            {productsData.filteredProducts.length.toLocaleString()} items
            {(productsData.appliedFilters.categories.length > 0 ||
              productsData.appliedFilters.brands.length > 0 ||
              productsData.appliedFilters.priceRange.max < 200000) && (
              <span className="text-primary-main-500 ml-1">
                (filtered from {productsData.products.length} total)
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="hidden sm:block typo-b3-regular text-gray-700">
              Sort by:
            </span>
            <select
              value={productsData.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 typo-b3-regular text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-main-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(productsData.appliedFilters.categories.length > 0 ||
        productsData.appliedFilters.brands.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {productsData.appliedFilters.categories.map((category) => (
            <span
              key={category}
              className="inline-flex items-center px-3 py-1 rounded-full typo-c1-regular bg-blue-100 text-blue-800 border border-blue-200"
            >
              {category}
              <button
                onClick={() => {
                  const newCategories =
                    productsData.appliedFilters.categories.filter(
                      (c) => c !== category
                    );
                  dispatch({
                    type: "products/updateCategoryFilter",
                    payload: newCategories,
                  });
                }}
                className="ml-2 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          ))}
          {productsData.appliedFilters.brands.map((brand) => (
            <span
              key={brand}
              className="inline-flex items-center px-3 py-1 rounded-full typo-c1-regular bg-green-100 text-green-800 border border-green-200"
            >
              {brand}
              <button
                onClick={() => {
                  const newBrands = productsData.appliedFilters.brands.filter(
                    (b) => b !== brand
                  );
                  dispatch({
                    type: "products/updateBrandFilter",
                    payload: newBrands,
                  });
                }}
                className="ml-2 hover:text-green-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Products Grid - Responsive grid */}
      {productsData.filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {productsData.filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="typo-h4-semiBold text-gray-700 mb-2">
            No products found
          </div>
          <p className="typo-b3-regular text-gray-500 mb-4">
            Try adjusting your filters or check back later.
          </p>
          {(productsData.appliedFilters.categories.length > 0 ||
            productsData.appliedFilters.brands.length > 0 ||
            productsData.appliedFilters.priceRange.max < 200000) && (
            <button
              onClick={() => dispatch({ type: "products/clearAllFilters" })}
              className="px-4 py-2 bg-primary-main-500 text-white rounded-md typo-b3-semiBold hover:bg-primary-main-600"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductGrid;
