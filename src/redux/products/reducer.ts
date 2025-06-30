import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProductsReducerState, IProduct, IFilters } from "./interface";

// Mock product data
const mockProducts: IProduct[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    price: 134900,
    originalPrice: 159900,
    features: ["6.7″ Super Retina XDR", "A17 Pro chip", "48MP camera system"],
    category: "smartphones",
    inStock: true,
    rating: 4.8,
    reviewCount: 2847,
    discount: 16,
  },
  {
    id: "2",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    price: 129999,
    originalPrice: 139999,
    features: ["6.8″ Dynamic AMOLED", "200MP camera", "S Pen included"],
    category: "smartphones",
    inStock: true,
    rating: 4.6,
    reviewCount: 3721,
    discount: 7,
  },
  {
    id: "3",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    price: 106999,
    originalPrice: 112999,
    features: ["6.7″ LTPO OLED", "Google Tensor G3", "Magic Eraser"],
    category: "smartphones",
    inStock: true,
    rating: 4.2,
    reviewCount: 967,
    discount: 5,
  },
  {
    id: "4",
    name: "OnePlus 12",
    brand: "OnePlus",
    image:
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
    price: 64999,
    originalPrice: 69999,
    features: ["6.82″ LTPO AMOLED", "Snapdragon 8 Gen 3", "100W charging"],
    category: "smartphones",
    inStock: true,
    rating: 4.4,
    reviewCount: 1892,
    discount: 7,
  },
  {
    id: "5",
    name: "Xiaomi 14 Pro",
    brand: "Xiaomi",
    image:
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&h=400&fit=crop",
    price: 79999,
    originalPrice: 84999,
    features: ["6.73″ LTPO OLED", "Snapdragon 8 Gen 3", "120W HyperCharge"],
    category: "smartphones",
    inStock: true,
    rating: 4.3,
    reviewCount: 1456,
    discount: 6,
  },
  {
    id: "6",
    name: "iPhone 14",
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop",
    price: 69900,
    originalPrice: 79900,
    features: ["6.1″ Super Retina XDR", "A15 Bionic chip", "Dual camera"],
    category: "smartphones",
    inStock: true,
    rating: 4.5,
    reviewCount: 4532,
    discount: 13,
  },
  {
    id: "7",
    name: "MacBook Pro 14",
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    price: 199900,
    features: ["M3 Pro chip", "14″ Liquid Retina XDR", "18-hour battery"],
    category: "laptops",
    inStock: true,
    rating: 4.7,
    reviewCount: 1523,
  },
  {
    id: "8",
    name: "AirPods Pro",
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop",
    price: 24900,
    features: [
      "Active Noise Cancellation",
      "Spatial Audio",
      "6 hours listening",
    ],
    category: "headphones",
    inStock: true,
    rating: 4.5,
    reviewCount: 5892,
  },
];

const defaultFilters: IFilters = {
  categories: [],
  brands: [],
  priceRange: { min: 0, max: 200000 },
  colors: [],
  inStockOnly: false,
};

// Filter products based on applied filters
const applyFilters = (
  products: IProduct[],
  filters: IFilters,
  sortBy: string
): IProduct[] => {
  let filtered = products.filter((product) => {
    // Category filter
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    ) {
      return false;
    }

    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }

    // Price filter
    if (
      product.price < filters.priceRange.min ||
      product.price > filters.priceRange.max
    ) {
      return false;
    }

    // In stock filter
    if (filters.inStockOnly && !product.inStock) {
      return false;
    }

    return true;
  });

  // Apply sorting
  switch (sortBy) {
    case "price_low_high":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price_high_low":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "customer_rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "popularity":
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "discount":
      filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      break;
    case "newest":
      // For demo purposes, sort by ID (assuming higher ID = newer)
      filtered.sort((a, b) => b.id.localeCompare(a.id));
      break;
    default:
      // Recommended - sort by rating * review count for relevance score
      filtered.sort(
        (a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount
      );
  }

  return filtered;
};

export const initialState: IProductsReducerState = {
  isLoading: false,
  error: "",
  data: {
    products: mockProducts,
    filteredProducts: mockProducts,
    selectedCategory: "all",
    appliedFilters: defaultFilters,
    sortBy: "recommended",
    comparison: {
      products: [],
      isVisible: false,
    },
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsLoadingStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    setProductsLoadingEnd: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    setProducts: (state, { payload }: PayloadAction<IProduct[]>) => {
      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          ...state.data,
          products: payload,
          filteredProducts: payload,
        },
      };
    },
    filterProductsByCategory: (state, { payload }: PayloadAction<string>) => {
      const filteredProducts =
        payload === "all"
          ? state.data.products
          : state.data.products.filter(
              (product) => product.category === payload
            );

      return {
        ...state,
        data: {
          ...state.data,
          filteredProducts,
          selectedCategory: payload,
        },
      };
    },
    updateCategoryFilter: (state, { payload }: PayloadAction<string[]>) => {
      const newFilters = { ...state.data.appliedFilters, categories: payload };
      const filteredProducts = applyFilters(
        state.data.products,
        newFilters,
        state.data.sortBy
      );

      return {
        ...state,
        data: {
          ...state.data,
          appliedFilters: newFilters,
          filteredProducts,
        },
      };
    },
    updateBrandFilter: (state, { payload }: PayloadAction<string[]>) => {
      const newFilters = { ...state.data.appliedFilters, brands: payload };
      const filteredProducts = applyFilters(
        state.data.products,
        newFilters,
        state.data.sortBy
      );

      return {
        ...state,
        data: {
          ...state.data,
          appliedFilters: newFilters,
          filteredProducts,
        },
      };
    },
    updatePriceFilter: (
      state,
      { payload }: PayloadAction<{ min: number; max: number }>
    ) => {
      const newFilters = { ...state.data.appliedFilters, priceRange: payload };
      const filteredProducts = applyFilters(
        state.data.products,
        newFilters,
        state.data.sortBy
      );

      return {
        ...state,
        data: {
          ...state.data,
          appliedFilters: newFilters,
          filteredProducts,
        },
      };
    },
    updateInStockFilter: (state, { payload }: PayloadAction<boolean>) => {
      const newFilters = { ...state.data.appliedFilters, inStockOnly: payload };
      const filteredProducts = applyFilters(
        state.data.products,
        newFilters,
        state.data.sortBy
      );

      return {
        ...state,
        data: {
          ...state.data,
          appliedFilters: newFilters,
          filteredProducts,
        },
      };
    },
    updateSortBy: (state, { payload }: PayloadAction<string>) => {
      const filteredProducts = applyFilters(
        state.data.products,
        state.data.appliedFilters,
        payload
      );

      return {
        ...state,
        data: {
          ...state.data,
          sortBy: payload,
          filteredProducts,
        },
      };
    },
    clearAllFilters: (state) => {
      const filteredProducts = applyFilters(
        state.data.products,
        defaultFilters,
        state.data.sortBy
      );

      return {
        ...state,
        data: {
          ...state.data,
          appliedFilters: defaultFilters,
          filteredProducts,
        },
      };
    },
    addToComparison: (state, { payload }: PayloadAction<IProduct>) => {
      const currentProducts = state.data.comparison.products;

      // Don't add if already in comparison or if already have 3 products
      if (
        currentProducts.find((p) => p.id === payload.id) ||
        currentProducts.length >= 3
      ) {
        return state;
      }

      const newProducts = [...currentProducts, payload];

      return {
        ...state,
        data: {
          ...state.data,
          comparison: {
            products: newProducts,
            isVisible: newProducts.length >= 2,
          },
        },
      };
    },
    removeFromComparison: (state, { payload }: PayloadAction<string>) => {
      const newProducts = state.data.comparison.products.filter(
        (p) => p.id !== payload
      );

      return {
        ...state,
        data: {
          ...state.data,
          comparison: {
            products: newProducts,
            isVisible: newProducts.length >= 2,
          },
        },
      };
    },
    clearComparison: (state) => {
      return {
        ...state,
        data: {
          ...state.data,
          comparison: {
            products: [],
            isVisible: false,
          },
        },
      };
    },
    toggleComparisonView: (state) => {
      return {
        ...state,
        data: {
          ...state.data,
          comparison: {
            ...state.data.comparison,
            isVisible: !state.data.comparison.isVisible,
          },
        },
      };
    },
    productsGetFail: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    },
    resetProducts: () => {
      return initialState;
    },
  },
});

export const {
  setProductsLoadingStart,
  setProductsLoadingEnd,
  setProducts,
  filterProductsByCategory,
  updateCategoryFilter,
  updateBrandFilter,
  updatePriceFilter,
  updateInStockFilter,
  updateSortBy,
  clearAllFilters,
  addToComparison,
  removeFromComparison,
  clearComparison,
  toggleComparisonView,
  productsGetFail,
  resetProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
