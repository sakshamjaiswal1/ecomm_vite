import { useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import FilterSidebar from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import ComparisonBar from "@/components/ComparisonBar";
import ComparisonView from "@/components/ComparisonView";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { comparison } = useSelector(
    (state: IRootState) => state.products.data
  );

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Electronics", href: "/electronics" },
    { label: "Smartphones" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div
        className={`max-w-7xl mx-auto ${
          comparison.products.length >= 2 ? "pb-16 sm:pb-20" : ""
        }`}
      >
        {/* Breadcrumb - Hidden on mobile */}
        <div className="hidden sm:block px-4 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden px-6 py-3 bg-white border-b border-gray-200">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md typo-b3-semiBold text-gray-700"
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filters</span>
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <>
              {/* Backdrop */}
              <div
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsSidebarOpen(false)}
              />

              {/* Sidebar */}
              <div className="lg:hidden fixed inset-y-0 left-0 w-80 z-50 transform transition-transform duration-300 ease-in-out">
                <div className="bg-white h-full overflow-y-auto">
                  {/* Close button */}
                  <div className="flex justify-end p-4 border-b border-gray-200">
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-md"
                    >
                      <svg
                        className="w-6 h-6 text-gray-600"
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
                  <FilterSidebar />
                </div>
              </div>
            </>
          )}

          {/* Main Content Area */}
          <div className="flex-1 p-6 lg:p-6 bg-white lg:ml-4 lg:mr-4 mx-0 lg:mx-0">
            <ProductGrid />
          </div>
        </div>
      </div>

      {/* Comparison Components */}
      <ComparisonBar />
      <ComparisonView />
    </div>
  );
}

export default Home;
