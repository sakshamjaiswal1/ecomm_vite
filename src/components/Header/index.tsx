import { useState } from "react";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="typo-h3-bold text-primary-main-500 cursor-pointer">
              <svg className="w-10 h-8" viewBox="0 0 50 40" fill="currentColor">
                <path
                  d="M5 5L15 35L25 5L35 35L45 5"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Navigation Menu - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a
              href="#"
              className="typo-b2-semiBold text-gray-900 hover:text-primary-main-500 transition-colors uppercase tracking-wide"
            >
              MEN
            </a>
            <a
              href="#"
              className="typo-b2-semiBold text-gray-900 hover:text-primary-main-500 transition-colors uppercase tracking-wide"
            >
              WOMEN
            </a>
            <a
              href="#"
              className="typo-b2-semiBold text-gray-900 hover:text-primary-main-500 transition-colors uppercase tracking-wide"
            >
              KIDS
            </a>
            <a
              href="#"
              className="typo-b2-semiBold text-gray-900 hover:text-primary-main-500 transition-colors uppercase tracking-wide"
            >
              HOME
            </a>
            <a
              href="#"
              className="typo-b2-semiBold text-gray-900 hover:text-primary-main-500 transition-colors uppercase tracking-wide"
            >
              BEAUTY
            </a>
            <div className="relative">
              <a
                href="#"
                className="typo-b2-semiBold text-gray-900 hover:text-primary-main-500 transition-colors uppercase tracking-wide"
              >
                STUDIO
              </a>
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded">
                NEW
              </span>
            </div>
          </nav>

          {/* Search Bar - Hidden on small screens */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-md typo-b3-regular text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-main-500"
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-500"
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
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search icon for mobile */}
            <div className="md:hidden">
              <svg
                className="w-6 h-6 text-gray-700"
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
            </div>

            {/* Profile - Hidden on small screens */}
            <div className="hidden sm:flex flex-col items-center cursor-pointer group">
              <svg
                className="w-6 h-6 text-gray-700 group-hover:text-primary-main-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="typo-c2-semiBold text-gray-700 group-hover:text-primary-main-500">
                Profile
              </span>
            </div>

            {/* Wishlist - Hidden on small screens */}
            <div className="hidden sm:flex flex-col items-center cursor-pointer group">
              <svg
                className="w-6 h-6 text-gray-700 group-hover:text-primary-main-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="typo-c2-semiBold text-gray-700 group-hover:text-primary-main-500">
                Wishlist
              </span>
            </div>

            {/* Bag - Always visible */}
            <div className="flex flex-col items-center cursor-pointer group">
              <svg
                className="w-6 h-6 text-gray-700 group-hover:text-primary-main-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="hidden sm:block typo-c2-semiBold text-gray-700 group-hover:text-primary-main-500">
                Bag
              </span>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="#"
                className="typo-b2-semiBold text-gray-900 hover:text-primary-main-500 transition-colors uppercase tracking-wide"
              >
                MEN
              </a>
              <a
                href="#"
                className="typo-b2-semiBold text-gray-900 hover:text-primary-main-500 transition-colors uppercase tracking-wide"
              >
                WOMEN
              </a>
              <a
                href="#"
                className="typo-b2-semiBold text-gray-900 hover:text-primary-main-500 transition-colors uppercase tracking-wide"
              >
                KIDS
              </a>
              <a
                href="#"
                className="typo-b2-semiBold text-gray-900 hover:text-primary-main-500 transition-colors uppercase tracking-wide"
              >
                HOME
              </a>
              <a
                href="#"
                className="typo-b2-semiBold text-gray-900 hover:text-primary-main-500 transition-colors uppercase tracking-wide"
              >
                BEAUTY
              </a>
            </nav>
          </div>
        )}
      </div>

      {/* Sale Banner - Hidden on mobile */}
      <div className="hidden sm:block bg-gradient-to-r from-pink-400 to-red-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="typo-b3-semiBold">
            Sale Ends In{" "}
            <span className="bg-white text-red-500 px-2 py-1 rounded mx-1">
              10
            </span>
            h :{" "}
            <span className="bg-white text-red-500 px-2 py-1 rounded mx-1">
              00
            </span>
            m :{" "}
            <span className="bg-white text-red-500 px-2 py-1 rounded mx-1">
              39
            </span>
            s
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
