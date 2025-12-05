import VendorCard from "./VendorCard";
import { useVendors } from "./useVendors";
import Pagination from "../../ui/Pagination";

function VendorList() {
  const { vendors, isLoading, error, total } = useVendors();
  console.log("vendor list", vendors);


  return (
    <div className="mx-auto min-h-screen max-w-[95%] overflow-hidden rounded-xl shadow-lg lg:p-8">
      {/* Grid of cards */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 p-4 md:grid-cols-3 xl:grid-cols-4">
        {vendors?.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
      {/* {{ ... }} */}
      {/* Loading state */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-t-transparent rounded-full" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="mt-8 flex justify-center">
          <p className="text-center text-lg font-bold">
            Error loading vendors: {error.message}
          </p>
        </div>
      )}

      {/* No results state */}
      {!isLoading && vendors?.length === 0 && (
        <div className="mt-8 flex justify-center">
          <p className="text-center text-lg font-bold">
            No vendors found.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {!isLoading && total > 0 && (
        <div className="mt-8">
          <Pagination count={total} />
        </div>
      )}
    </div>
  );
}

export default VendorList;
