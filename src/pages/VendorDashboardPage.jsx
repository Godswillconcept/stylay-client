import VendorDashboardHeader from "../features/vendorFeature/VendorDashBoardHeader";
import Footer from "../ui/Footer";
import { Outlet } from "react-router-dom";

export default function VendorDashboardPage() {
  return (
    <div>
      <VendorDashboardHeader />
      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* This is where nested routes (product, earning, etc.) will render */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
