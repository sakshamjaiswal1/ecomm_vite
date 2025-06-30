import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "@/store";
import {
  addToComparison,
  removeFromComparison,
} from "@/redux/products/reducer";
import { IProduct } from "@/redux/products/interface";

interface ProductCardProps {
  product: IProduct;
}

// Star Rating Component
function StarRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return (
              <svg
                key={index}
                className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <svg
                key={index}
                className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-yellow-400"
                viewBox="0 0 20 20"
              >
                <defs>
                  <linearGradient id="half-fill">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#half-fill)"
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            );
          } else {
            return (
              <svg
                key={index}
                className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-gray-300"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  clipRule="evenodd"
                />
              </svg>
            );
          }
        })}
      </div>
      <span className="typo-c2-regular lg:typo-c1-regular text-gray-600 ml-1">
        {rating} | {reviewCount.toLocaleString()}
      </span>
    </div>
  );
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const { comparison } = useSelector(
    (state: IRootState) => state.products.data
  );

  const isInComparison = comparison.products.some((p) => p.id === product.id);
  const isComparisonFull = comparison.products.length >= 3;

  const handleCompareToggle = () => {
    if (isInComparison) {
      dispatch(removeFromComparison(product.id));
    } else {
      dispatch(addToComparison(product));
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-xl transitionMedium cursor-pointer group border border-gray-200 relative">
      {/* Product Image with Discount Badge */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transitionMedium"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 lg:top-3 lg:left-3 bg-red-500 text-white px-2 py-1 lg:px-2.5 lg:py-1 rounded typo-c2-semiBold lg:typo-c1-semiBold">
            {product.discount}% OFF
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white typo-b3-semiBold lg:typo-b2-semiBold">
              Out of Stock
            </span>
          </div>
        )}

        {/* Compare Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCompareToggle();
          }}
          disabled={!isInComparison && isComparisonFull}
          className={`absolute top-2 right-2 lg:top-3 lg:right-3 p-2 rounded-full transition-all duration-200 ${
            isInComparison
              ? "bg-blue-500 text-white"
              : isComparisonFull
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
          title={
            isInComparison
              ? "Remove from comparison"
              : isComparisonFull
              ? "Comparison full (max 3 products)"
              : "Add to comparison"
          }
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </button>
      </div>

      {/* Product Details */}
      <div className="p-3 lg:p-4">
        {/* Brand */}
        <div className="typo-c1-semiBold lg:typo-b3-semiBold text-gray-600 mb-1 uppercase tracking-wide">
          {product.brand}
        </div>

        {/* Product Name */}
        <h3 className="typo-b3-semiBold lg:typo-b2-semiBold text-gray-900 mb-2 lg:mb-3 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Rating - Hidden on small mobile */}
        <div className="hidden sm:block mb-2 lg:mb-3">
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        {/* Price */}
        <div className="flex items-center gap-1 lg:gap-2 mb-2">
          <span className="typo-b2-bold lg:typo-h5-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <>
              <span className="typo-c1-regular lg:typo-b3-regular text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="typo-c2-semiBold lg:typo-c1-semiBold text-red-500">
                ({product.discount}% OFF)
              </span>
            </>
          )}
        </div>

        {/* Features - Hidden on mobile */}
        {product.features.length > 0 && (
          <div className="hidden lg:block typo-c1-regular text-gray-600 truncate">
            {product.features[0]}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
