import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "@/store";
import {
  removeFromComparison,
  clearComparison,
  toggleComparisonView,
} from "@/redux/products/reducer";

function ComparisonBar() {
  const dispatch = useDispatch();
  const { comparison } = useSelector(
    (state: IRootState) => state.products.data
  );

  if (comparison.products.length < 2) {
    return null;
  }

  const handleRemoveProduct = (productId: string) => {
    dispatch(removeFromComparison(productId));
  };

  const handleClearAll = () => {
    dispatch(clearComparison());
  };

  const handleCompare = () => {
    dispatch(toggleComparisonView());
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Selected products */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="typo-c1-semiBold sm:typo-b3-semiBold text-gray-900">
              Compare ({comparison.products.length}/3)
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              {comparison.products.map((product) => (
                <div key={product.id} className="relative group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove from comparison"
                  >
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3"
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

                  {/* Tooltip - Hidden on mobile */}
                  <div className="hidden sm:block absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {product.name}
                  </div>
                </div>
              ))}

              {/* Empty slots */}
              {[...Array(3 - comparison.products.length)].map((_, index) => (
                <div
                  key={index}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={handleClearAll}
              className="hidden sm:block px-4 py-2 border border-gray-300 text-gray-600 rounded-md typo-b3-semiBold hover:bg-gray-50"
            >
              Clear All
            </button>
            <button
              onClick={handleCompare}
              className="px-3 py-2 sm:px-6 sm:py-2 bg-blue-500 text-white rounded-md typo-c1-semiBold sm:typo-b3-semiBold hover:bg-blue-600"
            >
              <span className="hidden sm:inline">Compare Products</span>
              <span className="sm:hidden">Compare</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComparisonBar;
