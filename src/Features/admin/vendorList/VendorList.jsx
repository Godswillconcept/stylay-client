import { Link } from "react-router-dom";
import Table from "../Table";
import Pagination from "../Pagination";
import { useState, useMemo } from "react";
// import { getStatusClasses } from "../../utils/helper";
import AdminFilterBar from "../AdminFilterBar";
import { useVendorList } from "./useVendorList";
import { LoadingSpinner } from "../../../ui/Loading/LoadingSpinner";

const headers = [
  { key: "sn", label: "SN", className: "w-16" },
  { key: "vendor_name", label: "Vendor Name", className: "min-w-[200px]" },
  { key: "email", label: "Email", className: "w-32" },
  { key: "product_tags_count", label: "Products Tagged", className: "w-42" },
  { key: "total_earnings", label: "Total Earnings", className: "w-42" },
  { key: "status", label: "Status", className: "w-28" },
];

const VendorList = () => {
  const { vendors, isLoading, error } = useVendorList();
  const totalItems = vendors?.length || 0;
  console.log(vendors);

  const [filters, setFilters] = useState({
    status: "All",
    sortby: "All",
    date: "All",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filterConfig = [
    {
      key: "status",
      label: "Status",
      options: ["All", "Active", "Inactive", "Suspended"],
    },
    {
      key: "date",
      label: "Date Joined",
      options: ["All"],
    },
    {
      key: "sortby",
      label: "Sort By",
      options: ["All", "Ascending", "Descending"],
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: "All",
      sortby: "All",
      date: "All",
    });
    setSearchTerm("");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  // Total items from the API

  // Get current items for pagination
  const currentItems = useMemo(() => {
    if (!vendors) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return vendors.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, vendors]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error loading Vendors data
      </div>
    );

  // Render each row in the table
  const renderVendorRow = (vendor) => [
    <td key="sn" className="px-6 py-4 text-sm font-medium text-gray-900">
      {vendor.vendor_id}
    </td>,
    <td key="vendor_name" className="px-6 py-4 text-sm">
      <Link
        to={`/admin-vendors/${vendor.vendor_id}`}
        className="text-blue-600 hover:text-blue-800 hover:underline"
      >
        {vendor.vendor_name}
      </Link>
    </td>,
    <td key="email" className="px-6 py-4 text-sm text-gray-500">
      {vendor.email}
    </td>,
    <td key="product_tags_count" className="px-6 py-4 text-sm text-gray-500">
      {vendor.product_tags_count}
    </td>,
    <td
      key="total_earnings"
      className="px-6 py-4 text-sm font-medium text-gray-900"
    >
      ${vendor.total_earnings?.toLocaleString()}
    </td>,
    <td key="status" className="px-6 py-4">
      <span
      // className={`inline-flex rounded px-2 py-1 text-xs leading-5 font-semibold ${getStatusClasses(
      //   vendor.status,
      // )}`}
      >
        {vendor.status}
      </span>
    </td>,
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-2">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
        </div>

        {/* Action Bar */}
        <AdminFilterBar
          filters={filters}
          filterConfig={filterConfig}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search vendors"
        />

        {/* Vendors Table */}
        <div className="mt-2">
          <Table
            headers={headers}
            data={currentItems}
            renderRow={renderVendorRow}
            className="rounded-lg bg-white"
            theadClassName="bg-gray-50"
          />
        </div>

        {/* Pagination */}
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default VendorList;
