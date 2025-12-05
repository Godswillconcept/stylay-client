import JournalCard from "../Features/journalsFeature/JournalCard";
import JournalGrid from "../Features/journalsFeature/JournalGrid";
import ProductCard from "./ProductCard";
import ProductSet from "./ProductSet";
import { journalEntries } from "../data/Product";
import { useBlogs } from "../Features/journalsFeature/useBlogs";

function FeaturedSection({ trendingProducts }) {
  const { blogs, isLoading } = useBlogs();
  const landingBlog = blogs?.slice(0, 4)
  return (
    <div className="bg-neutral-100 p-2 sm:p-4">
      {/* Decorative Border */}
      <div className="rounded-2xl p-1 shadow">
        <div className="rounded-[14px] bg-white py-5">
          {/* Trending Now Section */}
          <section>
            <ProductSet
              title="TRENDING NOW"
              products={trendingProducts}
              showViewMore
              onViewMore={() => { }}
            />

          </section>


          <section className="mt-5 mb-5 rounded border border-neutral-200 p-4 shadow-2xl">
            <h2 className="text-grey-700 mb-5 border-b border-neutral-200 pb-4 text-2xl font-medium">
              Journal
            </h2>
            <JournalGrid journals={landingBlog} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default FeaturedSection;
