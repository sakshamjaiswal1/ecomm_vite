export interface IProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  features: string[];
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  discount?: number;
}

export interface IFilters {
  categories: string[];
  brands: string[];
  priceRange: {
    min: number;
    max: number;
  };
  colors: string[];
  inStockOnly: boolean;
}

export interface IComparison {
  products: IProduct[];
  isVisible: boolean;
}

export interface IProductsData {
  products: IProduct[];
  filteredProducts: IProduct[];
  selectedCategory: string;
  appliedFilters: IFilters;
  sortBy: string;
  comparison: IComparison;
}

export interface IProductsReducerState {
  isLoading: boolean;
  error: string;
  data: IProductsData;
}
