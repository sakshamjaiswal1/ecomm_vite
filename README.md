# E-Commerce Product Comparison App

A modern, responsive e-commerce application built with React, TypeScript, and Redux Toolkit, featuring comprehensive product comparison functionality and professional UI design.

## 🚀 Features

#### 🎨 **Professional UI Design**

- Modern e-commerce interface
- Responsive design for mobile, tablet, and desktop
- Card-based product layout
- Sticky navigation header
- Sale countdown banner

#### 🛍️ **Product Management**

- 8 electronics products (smartphones, laptops, tablets, headphones, smart watches, gaming accessories)
- Star ratings and reviews count
- Discount badges and original pricing
- Stock availability indicators
- Indian Rupee (₹) currency formatting
- Product key features display

#### 🔍 **Advanced Filtering System**

- **Categories**: Smartphones, Laptops, Tablets, Headphones, Smart Watches, Gaming Accessories
- **Brands**: Apple, Samsung, OnePlus, Xiaomi, Sony, Dell, HP, Lenovo, etc.
- **Price Range**: Interactive slider with min/max values
- **Technical Specs**: Storage, RAM, Screen Size, Operating System
- **Color Options**: Visual color swatches
- **Ratings Filter**: Filter by star ratings

#### 📱 **Responsive Design**

- Mobile-first approach
- **Breakpoint-specific features**:
  - Mobile (< 640px): Single column, hamburger menu, overlay filters
  - Tablet (640px - 1024px): 2-column grid, compact navigation
  - Desktop (> 1024px): 3-column grid, full sidebar, complete navigation
- Touch-friendly interactions
- Optimized mobile header with collapsible elements

#### 🔄 **Product Comparison System**

- Add up to 3 products for comparison
- Smart comparison logic (prevents duplicate additions)
- Floating comparison bar (appears when products selected)
- Full-screen comparison view with side-by-side layout
- Visual highlighting of specification differences
- Individual product removal and clear all functionality

#### 🧭 **Navigation & User Experience**

- Breadcrumb navigation (Home / Electronics / Smartphones)
- Search functionality with autocomplete styling
- User account features (Profile, Wishlist, Shopping Bag)
- Quick filter buttons for popular options
- Product sorting options (price, popularity, ratings)

## 🛠️ Tech Stack

### Core Technologies:

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Redux** - React bindings for Redux

### Styling & UI:

- **Tailwind CSS** - Utility-first CSS framework
- **Custom Typography System** - Consistent design tokens
- **Responsive Design** - Mobile-first approach
- **SCSS** - Enhanced CSS with variables and mixins

### Additional Libraries:

- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Copy to Clipboard** - Copy functionality
- **Tailwind Merge** - Conditional class merging
- **Ant Design** - UI component library (selective usage)

### Development Tools:

- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Folder Structure

```
ecomm_vite/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Breadcrumb/       # Navigation breadcrumb
│   │   ├── ComparisonBar/    # Floating comparison interface
│   │   ├── ComparisonView/   # Full comparison modal
│   │   ├── FilterSidebar/    # Product filtering sidebar
│   │   ├── Header/           # Main navigation header
│   │   ├── ProductCard/      # Individual product display
│   │   └── ProductGrid/      # Product grid layout
│   ├── pages/
│   │   └── home/             # Main homepage
│   ├── redux/                # Redux store and slices
│   │   └── slices/
│   │       └── products/     # Products state management
│   ├── interface/            # TypeScript interfaces
│   ├── hooks/                # Custom React hooks
│   ├── utility/              # Helper functions
│   ├── config/               # Configuration files
│   ├── layouts/              # Page layout components
│   ├── assets/               # Images and icons
│   ├── scss/                 # SCSS stylesheets
│   ├── enum/                 # TypeScript enums
│   ├── store.ts              # Redux store configuration
│   ├── router.config.tsx     # Route definitions
│   └── main.tsx              # Application entry point
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration
└── README.md                 # Project documentation
```

## 🚦 Installation & Setup

### Prerequisites:

- Node.js 16+
- npm or yarn package manager

### Installation Steps:

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ecomm_vite
   ```

2. **Install dependencies**

   ```bash
   # Using yarn (recommended)
   yarn install

   # Or using npm
   npm install
   ```

3. **Start development server**

   ```bash
   # Using yarn
   yarn dev

   # Or using npm
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts:

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint

## 📖 Usage Guide

### Product Browsing:

1. **View Products**: Browse the grid of electronics products
2. **Filter Products**: Use the sidebar filters to narrow down results
3. **Search**: Use the search bar to find specific products
4. **Sort**: Apply sorting options for price, popularity, etc.

### Product Comparison:

1. **Add to Compare**: Click "Add to Compare" on any product card
2. **View Selection**: Comparison bar appears at the bottom showing selected products
3. **Compare Products**: Click "Compare" button to open detailed comparison
4. **Remove Items**: Remove individual products or clear all selections
5. **Close Comparison**: Close the comparison view to continue browsing

### Responsive Features:

- **Mobile**: Tap hamburger menu for navigation, use filter button for sidebar
- **Tablet**: Optimized 2-column layout with touch-friendly controls
- **Desktop**: Full 3-column grid with persistent sidebar

## 🏗️ Component Architecture

### Core Components:

#### **Header**

- Logo and branding
- Navigation menu (responsive)
- Search functionality
- User actions (Profile, Wishlist, Bag)
- Mobile hamburger menu
- Sale countdown banner

#### **ProductGrid**

- Product sorting options
- Grid layout (responsive: 1→2→3 columns)
- Loading states
- Empty states

#### **ProductCard**

- Product image with hover effects
- Brand and product name
- Star ratings and reviews
- Price with discount information
- Key features list
- Add to compare functionality
- Action buttons

#### **FilterSidebar**

- Category filters
- Brand selection (with search)
- Price range slider
- Technical specifications
- Color swatches
- Rating filters
- Clear filters option

#### **ComparisonBar**

- Selected products preview
- Product count indicator
- Compare button
- Individual remove buttons
- Clear all functionality

#### **ComparisonView**

- Side-by-side product layout
- Comprehensive attribute comparison
- Visual difference highlighting
- Action buttons for each product
- Close/clear options

## 🗃️ Redux State Management

### Products Slice:

```typescript
interface ProductsState {
  products: IProduct[];
  filters: IFilters;
  comparison: {
    products: IProduct[];
    isVisible: boolean;
  };
  loading: boolean;
  error: string | null;
}
```

### Key Actions:

- `addToComparison` - Add product to comparison
- `removeFromComparison` - Remove specific product
- `clearComparison` - Clear all comparisons
- `toggleComparisonView` - Show/hide comparison modal
- `updateFilters` - Update filter criteria
- `setProducts` - Set product list

## 📱 Responsive Breakpoints

- **Mobile**: `< 640px` (sm)
- **Tablet**: `640px - 1024px` (sm to lg)
- **Desktop**: `> 1024px` (lg+)

### Responsive Features:

- Grid columns: 1 (mobile) → 2 (tablet) → 3 (desktop)
- Navigation: Hamburger menu → Partial → Full menu
- Sidebar: Overlay → Overlay → Fixed sidebar
- Typography: Scaled sizing across breakpoints
- Spacing: Optimized padding and margins

## 🎨 Design System

### Typography:

- Consistent typography scale (typo-h1 to typo-c2)
- Weight variants: regular, medium, semiBold, bold
- Responsive sizing

### Colors:

- Primary: Blue (#3B82F6)
- Success: Green variants
- Warning: Orange/Yellow variants
- Error: Red variants
- Neutral: Gray scale

### Components:

- Card-based design
- Consistent spacing (4px grid)
- Rounded corners and shadows
- Hover and focus states

## 📷 Screenshots

_Add screenshots of your application here showing:_

- Homepage with product grid
- Filter sidebar in action
- Product comparison view
- Mobile responsive design
- Comparison bar functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
