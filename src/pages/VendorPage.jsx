import { Suspense, lazy } from "react";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import VendorList from "../Features/vendorFeature/VendorList";
import VendorHero from "../Features/vendorFeature/VendorHero";

// Lazy load the RandomVendor component since it makes an API call
const RandomVendor = lazy(
  () => import("../Features/vendorFeature/RandomVendors"),
);

function LoadingFallback() {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="border-accent h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
    </div>
  );
}

function VendorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <VendorHero />

      <main className="mx-auto max-w-7xl">
        {/* Featured Vendor Section */}
        <Suspense fallback={<LoadingFallback />}>
          <RandomVendor />
        </Suspense>

        <section className="px-6 py-5 md:py-10 lg:px-8">
          <VendorList />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default VendorPage;
