import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "@/store";
import {
  removeFromComparison,
  clearComparison,
  toggleComparisonView,
} from "@/redux/products/reducer";


function ComparisonView() {
  const dispatch = useDispatch();
  const { comparison } = useSelector(
    (state: IRootState) => state.products.data
  );

  if (!comparison.isVisible || comparison.products.length < 2) {
    return null;
  }

  const handleRemoveProduct = (productId: string) => {
    dispatch(removeFromComparison(productId));
  };

  const handleClearAll = () => {
    dispatch(clearComparison());
  };

  const handleClose = () => {
    dispatch(toggleComparisonView());
  };

  // Find min/max values for highlighting
  const prices = comparison.products.map((p) => p.price);
  const ratings = comparison.products.map((p) => p.rating);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minRating = Math.min(...ratings);
  const maxRating = Math.max(...ratings);

  const getPriceHighlight = (price: number) => {
    if (prices.length === 1) return "";
    if (price === minPrice)
      return "bg-green-50 border-green-200 text-green-800";
    if (price === maxPrice) return "bg-red-50 border-red-200 text-red-800";
    return "";
  };

  const getRatingHighlight = (rating: number) => {
    if (ratings.length === 1) return "";
    if (rating === maxRating)
      return "bg-green-50 border-green-200 text-green-800";
    if (rating === minRating) return "bg-red-50 border-red-200 text-red-800";
    return "";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full h-full sm:max-w-6xl sm:w-full sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="typo-b2-bold sm:typo-h4-bold text-gray-900">
              Product Comparison
            </h2>
            <p className="typo-c1-regular sm:typo-b3-regular text-gray-600 mt-1">
              Comparing {comparison.products.length} products
            </p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={handleClearAll}
              className="px-3 py-2 sm:px-4 sm:py-2 border border-red-300 text-red-600 rounded-md typo-c1-semiBold sm:typo-b3-semiBold hover:bg-red-50"
            >
              <span className="hidden sm:inline">Clear All</span>
              <span className="sm:hidden">Clear</span>
            </button>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="p-4 sm:p-6">
          {/* Mobile: Single column layout */}
          <div className="block sm:hidden space-y-6">
            {comparison.products.map((product, index) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* Mobile Product Header */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    title="Remove from comparison"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded typo-c1-semiBold">
                    Product {index + 1}
                  </div>
                </div>

                {/* Mobile Product Details */}
                <div className="p-4 space-y-3">
                  <div>
                    <div className="typo-c1-semiBold text-gray-600 uppercase tracking-wide">
                      {product.brand}
                    </div>
                    <h3 className="typo-b3-semiBold text-gray-900 mt-1">
                      {product.name}
                    </h3>
                  </div>

                  {/* Mobile Price & Rating Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className={`p-2 rounded border ${getPriceHighlight(
                        product.price
                      )}`}
                    >
                      <div className="typo-c2-regular text-gray-600 mb-1">
                        Price
                      </div>
                      <div className="typo-b3-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </div>
                    </div>
                    <div
                      className={`p-2 rounded border ${getRatingHighlight(
                        product.rating
                      )}`}
                    >
                      <div className="typo-c2-regular text-gray-600 mb-1">
                        Rating
                      </div>
                      <div className="typo-b3-bold text-gray-900">
                        {product.rating} ⭐
                      </div>
                    </div>
                  </div>

                  {/* Mobile Features */}
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="typo-c1-regular text-gray-600 mb-2">
                      Key Features
                    </div>
                    <div className="space-y-1">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <div
                          key={idx}
                          className="typo-c1-regular text-gray-700"
                        >
                          • {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Status Row */}
                  <div className="flex gap-2">
                    <div className="flex-1 bg-blue-50 p-2 rounded">
                      <div className="typo-c2-regular text-gray-600">
                        Category
                      </div>
                      <div className="typo-c1-semiBold text-blue-800 capitalize">
                        {product.category}
                      </div>
                    </div>
                    <div
                      className={`flex-1 p-2 rounded ${
                        product.inStock ? "bg-green-50" : "bg-red-50"
                      }`}
                    >
                      <div className="typo-c2-regular text-gray-600">Stock</div>
                      <div
                        className={`typo-c1-semiBold ${
                          product.inStock ? "text-green-800" : "text-red-800"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparison.products.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    title="Remove from comparison"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-4 space-y-4">
                  {/* Name & Brand */}
                  <div>
                    <div className="typo-c1-semiBold text-gray-600 uppercase tracking-wide">
                      {product.brand}
                    </div>
                    <h3 className="typo-b2-semiBold text-gray-900 mt-1">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div
                    className={`p-3 rounded-lg border ${getPriceHighlight(
                      product.price
                    )}`}
                  >
                    <div className="typo-c1-regular text-gray-600 mb-1">
                      Price
                    </div>
                    <div className="typo-h5-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </div>
                    {product.originalPrice && (
                      <div className="typo-c1-regular text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div
                    className={`p-3 rounded-lg border ${getRatingHighlight(
                      product.rating
                    )}`}
                  >
                    <div className="typo-c1-regular text-gray-600 mb-1">
                      Rating
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 ${
                              index < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="typo-b3-semiBold text-gray-900 ml-2">
                        {product.rating}
                      </span>
                      <span className="typo-c1-regular text-gray-600 ml-1">
                        ({product.reviewCount.toLocaleString()})
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="typo-c1-regular text-gray-600 mb-2">
                      Key Features
                    </div>
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li
                          key={index}
                          className="typo-c1-regular text-gray-700 flex items-start"
                        >
                          <span className="text-green-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Category */}
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="typo-c1-regular text-gray-600 mb-1">
                      Category
                    </div>
                    <div className="typo-b3-semiBold text-blue-800 capitalize">
                      {product.category}
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div
                    className={`p-3 rounded-lg ${
                      product.inStock
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="typo-c1-regular text-gray-600 mb-1">
                      Availability
                    </div>
                    <div
                      className={`typo-b3-semiBold ${
                        product.inStock ? "text-green-800" : "text-red-800"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>

                  {/* Discount */}
                  {product.discount && (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="typo-c1-regular text-gray-600 mb-1">
                        Discount
                      </div>
                      <div className="typo-b3-semiBold text-orange-800">
                        {product.discount}% OFF
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Legend - Hidden on mobile */}
          <div className="hidden sm:block mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="typo-b3-semiBold text-gray-900 mb-2">
              Comparison Legend
            </div>
            <div className="flex flex-wrap gap-4 typo-c1-regular">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 border border-green-200 rounded mr-2"></div>
                <span className="text-gray-600">
                  Best Value (Lowest Price / Highest Rating)
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 border border-red-200 rounded mr-2"></div>
                <span className="text-gray-600">
                  Highest Price / Lowest Rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComparisonView;
