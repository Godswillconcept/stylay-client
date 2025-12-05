import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import RatingSummary from "./RatingSummary";
import ReviewFilters from "./ReviewFilters";
import ReviewCard from "./ReviewCard";
import Pagination from "../../ui/Pagination";

function ProductReviews({
  reviews = [],
  total = 0,
  averageRating = 0,
  ratingDistribution = [],
  isLoading = false,
}) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  if (isLoading) {
    return (
      <section className="py-12 lg:py-16 text-center text-gray-500">
        Loading reviews...
      </section>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <section className="py-12 lg:py-16 text-center text-gray-500">
        No reviews yet for this product.
      </section>
    );
  }

  return (
    <section id="reviews" className="py-12 lg:py-16">
      {/* --- RATING SUMMARY --- */}
      <RatingSummary
        averageRating={averageRating}
        ratingDistribution={ratingDistribution}
      />

      <div className="my-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">
        {/* Left Column: Filters (Desktop) */}
        <aside className="hidden lg:block">
          <ReviewFilters />
        </aside>

        {/* Right Column: Review List */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold">
              Review Lists ({total})
            </h3>

            {/* Mobile Filter Trigger */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2 text-sm font-semibold"
              >
                All reviews
                <span
                  className={`transition-transform ${showMobileFilters ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>
            </div>
          </div>

          {showMobileFilters && (
            <div className="border-ui-border mb-6 rounded-md border bg-gray-50 p-4 lg:hidden">
              <ReviewFilters />
            </div>
          )}

          {/* --- Review Cards --- */}
          <div>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Pagination */}
          {total > 0 && (
            <div className="mt-8">
              <Pagination count={total} currentPage={currentPage} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


export default ProductReviews;
