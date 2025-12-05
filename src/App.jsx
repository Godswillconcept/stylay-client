import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./features/cart";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./features/authentication/AuthLayout";
import DashboardLayout from "./features/dashboardFeature/DashboardLayout";
import AdminLayout from "./features/admin/AdminLayout";

// Auth Pages
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SetUpPasswordPage from "./pages/SetUpPasswordPage";
import CheckEmailPage from "./pages/CheckEmailPage";
import PhoneVerificationPage from "./pages/PhoneVerificationPage";

// Main Pages
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./features/productfeatures/ProductsPage";
import ProductDetailPage from "./features/productfeatures/ProductDetailPage";
import CategoryPage from "./features/productfeatures/CategoryPage";
import JournalPage from "./pages/JournalPage";
import VendorPage from "./pages/VendorPage";
import VendorDetailsPage from "./pages/VendorDetailsPage";
import VendorFormPage from "./pages/VendorFormPage";

// Cart
import CartPage from "./pages/CartPage";
import Cart from "./features/cart/Cart";
import CartSummary from "./features/cart/CartSummary";
import PaymentSummary from "./features/cart/PaymentSummary";

// Dashboard
import ProfilePage from "./pages/dashBoard/ProfilePage";
import Notification from "./pages/dashBoard/Notification";
import PasswordPage from "./pages/dashBoard/PasswordPage";
import OrderPage from "./pages/dashBoard/OrderPage";
import PendingReviewsPage from "./pages/dashBoard/PendingReviewsPage";
import PendingRateReviewsPage from "./pages/dashBoard/PendingRateReviewsPage";
import RecentPage from "./pages/dashBoard/RecentPage";
import AddressesPage from "./pages/dashBoard/AddressesPage";
import NewAddressPage from "./features/dashboardFeature/NewAddressPage";
import FollowedPage from "./pages/dashBoard/FollowedPage";
import WishListPage from "./pages/dashBoard/WishListPage";
import SupportPage from "./pages/dashBoard/SupportPage";

// Vendor
import VendorDashboardPage from "./pages/VendorDashboardPage";
// import VendorProductPage from "./pages/VendorProductPage";
import VendorEarningPage from "./pages/VendorEarningPage";

// Utils
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import EditAddressPage from "./features/dashboardFeature/EditAddressPage";
// import VendorDetails from "./features/vendorFeature/VendorDetails";
import VendorDashboard from "./features/vendorFeature/VendorDashboard";
import VendorProductDetail from "./features/vendorFeature/VendorProductDetail";
import SearchMain from "./features/productfeatures/SearchMain";
import SearchLayout from "./layouts/SearchLayout";
// import SearchLayout from "./layouts/SearchLayout";

// Admin
import AdminDashboard from "./features/admin/dashboard/AdminDashboard";
import VendorsApplication from "./features/admin/vendorApplication/VendorsApplication";
import ApplicantDetail from "./features/admin/vendorApplication/ApplicantDetail";
import VendorList from "./features/admin/vendorList/VendorList";
import VendorDetailPage from "./features/admin/vendorList/VendorDetailPage";
import VendorProducts from "./features/admin/vendorProduct/VendorProducts";
import AdminVendorProductDetail from "./features/admin/vendorProduct/AdminVendorProductDetail";
import AdminProductCollection from "./features/admin/collections/AdminProductCollection";
import CollectionDetail from "./features/admin/collections/CollectionDetail";
import OrdersList from "./features/admin/orders/OrdersList";
import OrderDetail from "./features/admin/orders/OrderDetail";
import Earnings from "./features/admin/adminVendorEarnings/Earnings";
import Feedback from "./features/admin/FeedBack";
import FeedbackDetail from "./features/admin/FeedbackDetail";
import AdminNotification from "./features/admin/AdminNotification";
import SubAdmin from "./features/admin/SubAdmin";
import SubAdminDetails from "./features/admin/SubAdminDetails";
import AdminJournal from "./features/admin/AdminJournal";
import JournalDetailPage from "./pages/JournalDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <CartProvider>
          <Routes>
            {/* index/landing page */}
            <Route index element={<LandingPage />} />

            {/* authentication pages */}
            <Route element={<AuthLayout />}>
              <Route path="signup" element={<SignupPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="forgotPassword" element={<ForgotPasswordPage />} />
              <Route path="checkEmail" element={<CheckEmailPage />} />
              <Route path="reset-password/:reset_token" element={<SetUpPasswordPage />} />
              <Route
                path="phoneVerification"
                element={<PhoneVerificationPage />}
              />
            </Route>

            {/* Admin */}
            <Route element={<AdminLayout />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route
                path="/admin-application"
                element={<VendorsApplication />}
              />
              <Route
                path="/admin-applicantDetail/:id"
                element={<ApplicantDetail />}
              />
              <Route path="/admin-vendors" element={<VendorList />} />
              <Route path="/admin-vendors/:id" element={<VendorDetailPage />} />
              <Route path="/vendor-products" element={<VendorProducts />} />
              <Route path="/orders" element={<OrdersList />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/earnings" element={<Earnings />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/notification" element={<AdminNotification />} />
              <Route path="/feedBackDetail" element={<FeedbackDetail />} />
              <Route path="/sub-admin" element={<SubAdmin />} />
              <Route path="/sub-admin/:id" element={<SubAdminDetails />} />
              <Route path="/admin-journal" element={<AdminJournal />} />
              <Route
                path="/vendor-products/:productId"
                element={<AdminVendorProductDetail />}
              />
              <Route
                path="/admin-collection"
                element={<AdminProductCollection />}
              />
              <Route
                path="/admin-collection/:id"
                element={<CollectionDetail />}
              />
            </Route>

            {/* Product pages with MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/products" element={<ProductsPage />} />

              {/* Category routes with nested product routes */}
              <Route path="/categories">
                <Route path=":categoryId">
                  <Route index element={<CategoryPage />} />
                  <Route
                    path="products"
                    element={<CategoryPage showAllProducts />}
                  />
                </Route>
              </Route>
            </Route>

            {/* Product details page without MainLayout */}
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/search" element={<SearchLayout />}>
              <Route index element={<SearchMain />} />
            </Route>

            {/* Other public pages */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/journals" element={<JournalPage />} />
            <Route path="/journals/:journalId" element={<JournalDetailPage />} />
            <Route path="/vendor" element={<VendorFormPage />} />
            <Route path="/vendors" element={<VendorPage />} />
            <Route path="/vendor/:vendorId" element={<VendorDetailsPage />} />

            {/* Cart */}
            <Route path="/cart" element={<CartPage />}>
              <Route index element={<Cart />} />
              <Route path="summary" element={<CartSummary />} />
              <Route path="payment" element={<PaymentSummary />} />
            </Route>

            {/* 👇 Default view when user visits /vendor-dashboard */}
            {/* Protected Vendor Routes */}
            <Route
              path="/vendor-dashboard"
              element={
                <ProtectedRoute requiredRole="vendor">
                  <VendorDashboardPage />
                </ProtectedRoute>
              }
            >
              {/* 👇 Default view when user visits /vendor-dashboard */}
              <Route index element={<VendorDashboard />} />

              {/* Product routes */}
              <Route path="product">
                <Route index element={<VendorDashboard />} />
                <Route
                  path="productOverview/:productId"
                  element={<VendorProductDetail />}
                />
              </Route>

              {/* Earnings */}
              <Route path="earning" element={<VendorEarningPage />} />
            </Route>

            {/* <Route path="/productDetail" element={<ProductDetailPage />} /> */}
            {/* <Route path="journals" element={<JournalPage />} /> */}

            {/* cart pages */}
            <Route path="/cart" element={<CartPage />}>
              <Route index element={<Cart />} />
              <Route path="cart-summary" element={<CartSummary />} />
              <Route path="payment" element={<PaymentSummary />} />
            </Route>

            {/* Dashboard */}
            <Route path="/settings" element={<DashboardLayout />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="notifications" element={<Notification />} />
              <Route path="password" element={<PasswordPage />} />
              <Route path="orders" element={<OrderPage />} />

              <Route path="pending-reviews">
                <Route index element={<PendingReviewsPage />} />
                <Route path=":orderId" element={<PendingRateReviewsPage />} />
              </Route>

              <Route path="recent" element={<RecentPage />} />
              <Route path="addresses" element={<AddressesPage />} />
              <Route path="addresses/new" element={<NewAddressPage />} />
              <Route path="addresses/edit/:id" element={<EditAddressPage />} />
              <Route path="followed" element={<FollowedPage />} />
              <Route path="wishlist" element={<WishListPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route index element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
