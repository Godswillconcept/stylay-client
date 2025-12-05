import FeaturedSection from "../ui/FeaturedSection";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import Hero from "../ui/Hero";
import ProductCarousel from "../ui/ProductCarousel";
// import { useProducts } from "../features/productfeatures/useProducts";
import { useNewArrival } from "../features/productfeatures/useNewArrival";
import { useTrendingProducts } from "../features/productfeatures/useTrendingProducts";

function LandingPage() {
  const { data: newArrival, totalItems } = useNewArrival();
  console.log("new arrival", newArrival);
  const { trendingProducts } = useTrendingProducts();

  return (
    <>
      <Header />
      <Hero />
      <ProductCarousel newArrival={newArrival} totalItems={totalItems} className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" />
      <FeaturedSection trendingProducts={trendingProducts} />
      <Footer />
    </>
  );
}

export default LandingPage;
