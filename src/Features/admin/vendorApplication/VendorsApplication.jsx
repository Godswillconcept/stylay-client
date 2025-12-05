import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import Table from "../Table";
import AdminFilterBar from "../AdminFilterBar";
import { useVendorApplications } from "./useVendorApplications";
import { LoadingSpinner } from "../../../ui/Loading/LoadingSpinner";

const headers = [
  { key: "sn", label: "SN", className: "w-16" },
  { key: "vendor_name", label: "Vendor Name", className: "w-42" },
  { key: "business_name", label: "Business Name", className: "w-42" },
  { key: "email", label: "Email", className: "w-32" },
  { key: "phone", label: "Phone Number", className: "w-42" },
  { key: "action", label: "Action", className: "w-32" },
];

const VendorsApplication = () => {
  const { applications, isLoading, error } = useVendorApplications();

  const totalItems = applications?.length || 0;
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
      options: ["All", "Active", "Pending", "Suspended"],
    },
    {
      key: "date",
      label: "Date joined",
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
  // Total items from the API response

  const currentItems = useMemo(() => {
    if (!applications) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return applications.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, applications]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error loading Applicants data
      </div>
    );

  // Render each row in the table
  const renderApplicationRow = (applicant) => (
    <Link
      to={`/admin-applicantDetail/${applicant.vendor_id}`}
      className="contents"
    >
      <td key="sn" className="px-6 py-4 text-sm font-medium text-gray-900">
        {applicant.vendor_id}
      </td>
      <td key="vendor_name" className="px-6 py-4 text-sm">
        {applicant.vendor_name}
      </td>
      <td key="business_name" className="px-6 py-4 text-sm text-gray-500">
        {applicant.business_name}
      </td>
      <td key="email" className="px-6 py-4 text-sm text-gray-500">
        {applicant.email}
      </td>
      <td key="phone" className="px-6 py-4 text-sm text-gray-500">
        {applicant.phone}
      </td>
      <td key="action" className="px-6 py-4 text-sm font-medium text-gray-900">
        {applicant.action}
      </td>
    </Link>
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-2">
      <div className="mx-auto max-w-full">
        {/* Header Section */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Vendors Application
          </h1>
        </div>

        {/* Filter, Search, and Action Bar (identical to previous table) */}

        <AdminFilterBar
          filters={filters}
          filterConfig={filterConfig}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search vendors"
        />

        {/* Vendors Application Table */}
        <Table
          headers={headers}
          data={currentItems}
          renderRow={renderApplicationRow}
          className="rounded-lg bg-white"
          theadClassName="bg-gray-50"
        />

        {/* Pagination */}
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          className="mt-6"
        />
      </div>
    </div>
  );
};

export default VendorsApplication;
