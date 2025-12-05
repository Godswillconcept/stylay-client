import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MessageCircle, Star, X, ChevronDown } from "lucide-react";
import { useVendorProductDetail } from "./useVendorProductOverview";
import { formatCurrency } from "../../utils/formatCurrency";
import { useProductAnalytics } from "./useProductAnalytics";

function VendorProductDetail() {
  const { productId } = useParams();
  const { product, isLoading, isError, error } =
    useVendorProductDetail(productId);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "+234",
    topic: "Loan",
    message: "",
  });
  const { analytics, isLoading: isAnalyticsLoading } =
    useProductAnalytics(productId);
  console.log("analytics", analytics);

  // Format date only when product is available
  const formattedDate = product?.createdAt
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(product.createdAt))
    : "";

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">
            Error: {error?.message || "Failed to load product details"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // If no product data is available
  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>No product data available</p>
      </div>
    );
  }

  const productImages = [
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
  ];

  const reviews = [
    {
      id: 1,
      name: "Daniel Balablue",
      rating: 5,
      comment: "Great fit and quality. Delivery took 2 days.",
      date: "Feb, 9th 2021 08:57:01 PM",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Daniel Balablue",
      rating: 5,
      comment: "Color matches the image perfectly!",
      date: "Feb, 9th 2021 08:57:01 PM",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
  ];

  const ratingDistribution = [
    { stars: 5, count: 2823, percentage: 90 },
    { stars: 4, count: 38, percentage: 12 },
    { stars: 3, count: 4, percentage: 4 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  const StarRating = ({ rating, size = "w-4 h-4" }) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= rating ? "fill-current text-orange-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back</span>
            </button>

            <button
              className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              onClick={openModal}
            >
              <MessageCircle className="h-4 w-4" />
              Send Us a Message
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid-rows grid grid-cols-1 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Main Image */}
              <div className="h-full w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm lg:h-[395px] lg:w-[950px]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt="Satin Midi Dress - Rose Gold"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Image Thumbnails */}
              <div className="grid grid-cols-3 gap-3 lg:flex lg:w-32 lg:flex-col">
                {product.images?.slice(0, 3).map((image, index) => (
                  <div
                    key={image.id}
                    className="h-full w-full overflow-hidden rounded-lg border-black shadow-md transition-all lg:h-[124px] lg:w-[216px]"
                  >
                    <img
                      src={image.image_url}
                      alt={`Product view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-8">
            {/* Product Overview */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-4 border-b border-gray-100 pb-5 text-lg font-semibold text-gray-900">
                Product Overview
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500">
                    Product Name
                  </label>
                  <p className="text-lg font-medium text-gray-900">
                    {product.name}
                  </p>
                </div>

                {/* Category */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500">
                    Category
                  </label>
                  <p className="text-sm font-semibold text-gray-900">
                    {product.category?.name}
                  </p>
                </div>

                {/* Price */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500">
                    Price
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(product.price)}
                  </p>
                </div>

                {/* Date Uploaded */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500">
                    Date Uploaded
                  </label>
                  <p className="text-sm font-semibold text-gray-900">
                    {formattedDate}
                  </p>
                </div>

                {/* Availability */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500">
                    Availability Status
                  </label>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Available Now
                  </span>
                </div>

                {/* SKU */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500">
                    SKU
                  </label>
                  <p className="font-mono text-sm font-semibold text-gray-900">
                    {product.sku}
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 border-b border-gray-100 pb-5 text-xl font-semibold text-gray-900">
                Performance Metrics
              </h2>

              <div className="grid-row grid gap-6 lg:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-500">
                    Views
                  </label>
                  <p className="text-2xl font-bold text-gray-900">302</p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-500">
                    Items Sold
                  </label>
                  <p className="text-2xl font-bold text-gray-900">56</p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-500">
                    Conversion Rate
                  </label>
                  <p className="text-2xl font-bold text-gray-900">21.5%</p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-500">
                    Stock Status
                  </label>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    In Stock (120 Left)
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Feedback */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Customer Feedback
              </h2>

              {/* Rating Summary */}
              <div className="mb-8 flex flex-col items-start gap-6 md:flex-row lg:flex-row">
                {/* Overall Rating Circle */}
                <div className="flex flex-row items-center gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <svg
                      className="h-20 w-20 -rotate-90 transform"
                      viewBox="0 0 36 36"
                    >
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="2"
                        strokeDasharray="90, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-900">
                        4.5
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <StarRating rating={5} size="w-3 h-3" />
                    <p className="mt-1 text-xs text-gray-500">
                      from 125k reviews
                    </p>
                  </div>
                </div>

                {/* Rating Bars */}
                <div className="flex-1">
                  {ratingDistribution.map((item) => (
                    <div
                      key={item.stars}
                      className="mb-2 flex items-center gap-3"
                    >
                      <div className="flex w-8 items-center gap-1">
                        <span className="text-sm text-gray-600">
                          {item.stars}.0
                        </span>
                        <Star className="h-3 w-3 fill-current text-orange-400" />
                      </div>
                      <div className="h-2 min-w-[200px] flex-1 rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-gray-800 transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="w-12 text-right text-sm text-gray-600">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-t border-gray-100 pt-6 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <h4 className="text-sm font-medium text-gray-900">
                            {review.name}
                          </h4>
                          <StarRating rating={review.rating} size="w-3 h-3" />
                        </div>
                        <p className="mb-2 text-sm leading-relaxed text-gray-700">
                          {review.comment}
                        </p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="mt-8 text-center">
                <button className="rounded-lg bg-gray-100 px-6 py-3 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200 sm:w-auto lg:w-full">
                  Load More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Send Message Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/35 backdrop-blur-[1.5px]"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden
            />

            {/* Modal Container */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="message-title"
              className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5"
              initial={{ scale: 0.98, y: 8, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="w-full text-center">
                  <h2
                    id="message-title"
                    className="text-xl font-semibold text-gray-900"
                  >
                    Send Us a Message
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Kindly provide the information below.
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-black/5 hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Field label="Full Name">
                  <input
                    type="text"
                    placeholder="Give us your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-gray-300 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                    required
                  />
                </Field>

                <Field label="Phone Number">
                  <input
                    type="tel"
                    placeholder="+234"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-gray-300 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                    required
                  />
                </Field>

                <Field label="Select Topic">
                  <div className="relative">
                    <select
                      value={formData.topic}
                      onChange={(e) =>
                        handleInputChange("topic", e.target.value)
                      }
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 py-2.5 pr-8 text-sm text-gray-900 shadow-sm focus:border-gray-300 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                      required
                    >
                      <option value="Loan">Loan</option>
                      <option value="Product Support">Product Support</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Partnership">Partnership</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </Field>

                <Field label="Message">
                  <textarea
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    rows={4}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-gray-300 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                    required
                  />
                </Field>

                <button
                  type="submit"
                  className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-b from-neutral-800 to-neutral-700 text-sm font-medium text-white shadow-sm ring-1 ring-black/10 hover:from-neutral-900 hover:to-neutral-800 focus:ring-2 focus:ring-neutral-400 focus:outline-none"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium tracking-wide text-gray-600">
        {label}
      </span>
      {children}
    </label>
  );
}

export default VendorProductDetail;
