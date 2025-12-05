import { useState } from "react";
import VendorDashboardHeader from "./VendorDashBoardHeader";
import { useVendorDashboardProduct } from "./useVendorDashboardProduct";
import { useVendorDashBoardStats } from "./useVendorDashBoardStats";

import {
  Search,
  Filter,
  Eye,
  ShoppingCart,
  MoreVertical,
  Plus,

} from "lucide-react";
// import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
function VendorDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBy, setFilterBy] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const {
    products: vendorProducts = [],
    pagination
  } = useVendorDashboardProduct(currentPage, 10); // 10 items per page

  const { stats: vendorStats = {} } = useVendorDashBoardStats();
  console.log("vendorStats", vendorStats);

  // Define mapping of API keys to display labels and formatting
  const statConfigs = {
    liveProducts: {
      label: "Live Products",
      format: (value) => value.toString(),
      change: "0% from last month",
      changeType: "positive"
    },
    totalSales: {
      label: "Total Sales (₦)",
      format: (value) => `₦${parseFloat(value).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: "0% from last month",
      changeType: "positive"
    },
    monthlyUnitsSold: {
      label: "Monthly Units Sold",
      format: (value) => value.toString(),
      change: "0% from last month",
      changeType: "positive"
    },
    totalViews: {
      label: "Total Product Views",
      format: (value) => value.toString(),
      change: "0% from last month",
      changeType: "positive"
    }
  };

  // Transform vendorStats into an array of stat objects with proper labels and formatting
  const stats = Object.entries(vendorStats).map(([key, value]) => ({
    ...statConfigs[key],
    value: statConfigs[key]?.format ? statConfigs[key].format(value) : value,
  }));


  const totalPages = pagination?.totalPages || 1;

  const ProductCard = ({ product }) => {
    console.log("product 1", product.id);

    return (
      <div className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
        {/* Product Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Status Badge */}
          {product.status === "Out of stock" ? (
            <div className="absolute top-3 left-3">
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                Out of stock
              </span>
            </div>
          ) : (
            <div className="absolute top-3 left-3">
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                Active
              </span>
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button className="bg-opacity-90 hover:bg-opacity-100 rounded-full bg-white p-2 shadow-sm">
              <MoreVertical className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Price Overlay */}
          <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="text-lg font-semibold text-white">
              {product.price}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900">
            {product.name}
          </h3>
          <p className="mb-3 text-xs text-gray-500">{product.Category?.name || 'Uncategorized'}</p>

          {/* Stats Row */}
          <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{product.impressions || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <ShoppingCart className="h-3 w-3" />
              <span>{product.sold_units || 0} sold</span>
            </div>
          </div>

          {/* Action Button */}
          <Link
            to={`/vendor-dashboard/product/productOverview/${product.id}`}
            state={{ product }}
            className="w-full rounded-md bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100"
          >
            View Details
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Stats */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-6"
              >
                <h3 className="mb-2 text-sm font-medium text-gray-500">
                  {stat.label}
                </h3>
                <p className="mb-1 text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p
                  className={`text-xs ${stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                    }`}
                >
                  {stat.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Product Listings
            </h2>
            <p className="text-sm text-gray-600 sm:max-w-2xl">
              Keep track of all products Stylay has listed under your vendor
              profile. Monitor performance, stock status, and customer
              engagement at a glance.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search and Filter Container */}
            <div className="flex w-full flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              {/* Filter Dropdown */}
              <div className="flex items-center">
                <div className="relative inline-block text-left">
                  <div className="flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="appearance-none bg-transparent pr-6 font-medium outline-none focus:outline-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <Filter className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-auto sm:min-w-[200px]">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2 pr-3 pl-9 text-sm text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white lg:block">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Price (₦)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vendorProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.Category?.name || 'Uncategorized'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${product.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.impressions}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.sold_units}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/vendor-dashboard/product/productOverview/${product.id}`}
                      className="w-full cursor-pointer rounded-md px-3 py-2 text-xs font-medium text-gray-700 transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 border-t border-gray-100 pt-6 sm:flex-row">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                      window.scrollTo(0, 0);
                    }
                  }}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-gray-200 p-2 transition-all duration-200 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show first 2 pages, current page with neighbors, and last 2 pages
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                      if (i === 4) pageNum = totalPages;
                      else if (i === 3) return '...';
                    } else if (currentPage >= totalPages - 2) {
                      if (i === 0) pageNum = 1;
                      else if (i === 1) return '...';
                      else pageNum = totalPages - 5 + i;
                    } else {
                      if (i === 0) pageNum = 1;
                      else if (i === 1) return '...';
                      else if (i === 3) return '...';
                      else if (i === 4) pageNum = totalPages;
                      else pageNum = currentPage - 1 + (i - 2);
                    }

                    if (pageNum === '...') {
                      return (
                        <span key={`ellipsis-${i}`} className="px-2 py-2 text-gray-500">
                          ...
                        </span>
                      );
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() =>
                          typeof pageNum === "number" && setCurrentPage(pageNum)
                        }
                        className={`rounded-lg px-3 py-2 text-sm transition-all duration-200 ${pageNum === currentPage
                          ? "bg-gray-900 text-white"
                          : pageNum === "..."
                            ? "cursor-default text-gray-400"
                            : "text-gray-600 hover:bg-gray-100"
                          }`}
                        disabled={pageNum === "..."}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                      window.scrollTo(0, 0);
                    }
                  }}
                  disabled={!pagination?.hasNextPage}
                  className="rounded-lg border border-gray-200 p-2 transition-all duration-200 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:hidden">
          {vendorProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile Pagination */}
        <div className="mt-8 text-center lg:hidden">
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
