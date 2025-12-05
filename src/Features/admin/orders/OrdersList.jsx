import { Link } from "react-router-dom";
import Table from "../Table";
import Pagination from "../Pagination";
import { useState, useMemo } from "react";
// import { StatusBadge } from "../../utils/helper";
import AdminFilterBar from "../AdminFilterBar";
import { useAdminOrders } from "./useAdminOrders";
import { LoadingSpinner } from "../../../ui/Loading/LoadingSpinner";

const headers = [
  { key: "id", label: "ID", className: "w-16" },
  { key: "name", label: "BUYER Name", className: "w-42" },
  { key: "address", label: "ADDRESS", className: "w-60" },
  { key: "order_date", label: "DATE", className: "w-42" },
  { key: "product", label: "PRODUCT", className: "w-32" },
  { key: "status", label: "STATUS", className: "w-28" },
];

const OrdersList = () => {
  const { orders: ordersData, isLoading, error } = useAdminOrders();
  const orders = useMemo(() => ordersData?.orders || [], [ordersData]);
  // const total = ordersData?.total || 0;
  console.log(orders);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    vendor: "All",
    status: "All",
  });

  const filterConfig = [
    {
      key: "category",
      label: "Category",
      options: ["All", "Electronics", "Fashion", "Digital Product", "Mobile"],
    },
    {
      key: "vendor",
      label: "Vendor",
      options: ["All"],
    },
    {
      key: "status",
      label: "Status",
      options: [
        "All",
        "Completed",
        "Processing",
        "Rejected",
        "On Hold",
        "In Transit",
      ],
    },
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: "All",
      vendor: "All",
      status: "All",
    });
    setSearchTerm("");
  };

  const itemsPerPage = 9;
  const totalItems = orders.length;
  // console.log(totalItems);

  // Get current items for pagination
  const currentItems = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return orders.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, orders]);

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
  const renderOrderRow = (order) => [
    <td key="id" className="px-6 py-4 text-sm font-medium text-gray-900">
      {order.id}
    </td>,
    <td key="name" className="px-6 py-4 text-sm">
      <Link
        to={`/orders/${order.id}`}
        className="text-blue-600 hover:text-blue-800 hover:underline"
      >
        {order.user.first_name + " " + order.user.last_name}
      </Link>
    </td>,
    <td key="address" className="px-6 py-4 text-sm text-gray-500">
      {order?.details?.address?.address_line}
    </td>,
    <td key="date" className="px-6 py-4 text-sm text-gray-500">
      {new Date(order.order_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </td>,
    <td key="product" className="px-6 py-4 text-sm font-medium text-gray-900">
      {order.items
        ? order.items
            .slice(0, 2)
            .map((item) => item.product?.name || "Unknown Product")
            .join(", ")
        : "No items"}
    </td>,
    <td key="status" className="px-6 py-4">
      <span
      // className={`inline-flex rounded px-2 py-1 text-xs leading-5 font-semibold ${StatusBadge(
      //   order.status,
      // )}`}
      >
        {order.order_status}
      </span>
    </td>,
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-2">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        </div>

        {/* Action Bar */}
        <AdminFilterBar
          filters={filters}
          filterConfig={filterConfig}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search orders"
        />

        {/* Orders Table */}
        <div className="mt-2">
          <Table
            headers={headers}
            data={currentItems}
            renderRow={renderOrderRow}
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

export default OrdersList;
