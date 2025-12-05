import { FiChevronRight, FiMapPin, FiShoppingCart } from "react-icons/fi";
import SummaryItem from "./SummaryItem";
import { useNavigate } from "react-router";

// --- Dummy Data ---
const summaryData = {
  customerAddress: {
    id: 1,
    name: "Bruno Fernandes",
    address: "11, Buhari place, Akanbi estate, Nigeria. | 08189351029",
  },
  cartItems: [
    {
      id: 1,
      category: "Men",
      name: "Shirt",
      price: 99.0,
      quantity: 12,
      deliveryDate: "24th December - 25th December",
      imageUrl: "/cartImg/CartImg1.png",
    },
    {
      id: 2,
      category: "Men",
      name: "Shirt",
      price: 99.0,
      quantity: 12,
      deliveryDate: "24th December - 25th December",
      imageUrl: "/cartImg/CartImg2.png",
    },
  ],
  orderSummary: {
    subtotal: 46399,
    vat: 46399,
    estimatedTotal: 100000,
    checkoutAmount: 1935,
  },
};

// --- Helper for Currency Formatting ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

function CartSummary() {
  const navigate = useNavigate();
  const { customerAddress, cartItems, orderSummary } = summaryData;
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F2F4F7] p-4 sm:p-6">
      <div className="mx-auto max-w-6xl rounded-lg bg-[#1018281A] p-4 lg:p-10">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Customer Address
          </h1>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 rounded-lg sm:p-8 md:grid-cols-2 lg:bg-white">
          {/* Left Section */}
          <div className="space-y-4 md:space-y-6">
            {/* Customer Address */}
            <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5E5FE] text-[#F26732]">
                    <FiMapPin size={20} />
                  </div>
                  <h2 className="text-lg font-semibold sm:text-xl">
                    Customer Address
                  </h2>
                </div>
                <button
                  type="button"
                  className="flex items-center text-sm font-medium text-gray-600 hover:text-black"
                >
                  Change <FiChevronRight />
                </button>
              </div>
              <div className="text-gray-600">
                <p className="font-semibold text-gray-800">
                  {customerAddress.name}
                </p>
                <p className="text-sm">{customerAddress.address}</p>
              </div>
            </section>

            {/* Cart Summary */}
            <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5E5FE] text-[#F26732]">
                    <FiShoppingCart size={20} />
                  </div>
                  <h2 className="text-lg font-semibold sm:text-xl">
                    Cart Summary
                  </h2>
                </div>
                <button
                  type="button"
                  className="flex items-center text-sm font-medium text-gray-600 hover:text-black"
                >
                  Change <FiChevronRight />
                </button>
              </div>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <SummaryItem key={item.id} item={item} />
                ))}
              </div>
            </section>
          </div>

          {/* Right Section (Order Summary) */}
          <div className="md:col-span-1">
            <div className="sticky top-6 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <h2 className="mb-4 text-lg font-semibold sm:text-xl">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600 sm:text-base">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium">
                    {formatCurrency(orderSummary.subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600 sm:text-base">
                  <span>VAT</span>
                  <span className="font-medium">
                    {formatCurrency(orderSummary.vat)}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <span className="text-sm text-gray-600">Promo Code</span>
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-grow rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <hr className="my-4" />

              <div className="mb-6 flex justify-between text-base font-bold sm:text-lg">
                <span>Estimated total</span>
                <span>{formatCurrency(orderSummary.estimatedTotal)}</span>
              </div>

              <button
                onClick={() => navigate("/cart/payment")}
                className="w-full rounded-2xl bg-black py-4 text-base font-semibold text-white transition hover:bg-gray-900 sm:text-lg"
              >
                Proceed to Checkout (
                {formatCurrency(orderSummary.checkoutAmount)})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
