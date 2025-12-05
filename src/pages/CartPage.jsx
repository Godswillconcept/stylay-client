import Footer from "../ui/Footer";
import { Outlet } from "react-router";
import Header from "../ui/Header";

function CartPage() {
  return (
    <>
      <Header />
      <div>
        <div className="mt-8 mb-5">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default CartPage;
