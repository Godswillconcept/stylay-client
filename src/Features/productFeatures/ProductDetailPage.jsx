import { useState } from "react";
import ProductGallery from "../../ui/ProductGallery";
import ProductInfo from "../../ui/ProductInfo";
import ProductReviews from "../reviews/ProductReviews";
import ProductHeader from "../../ui/ProductHeader";
import Footer from "../../ui/Footer";
import { useProduct } from "./useProduct";
import { useParams } from "react-router";
import useReviews from "./useReviews";
import { LoadingSpinner } from "../../ui/Loading/LoadingSpinner";


// const ProductDetailPage = () => {
//   const { productId } = useParams();
//   const { product, isLoading, error } = useProduct(); // <-- fetch product by id
//   const {
//     reviews,
//     averageRating,
//     ratingDistribution,
//     isLoading: loadingReviews,
//   } = useReviews(productId);
//   console.log("product review", reviews);

//   const productImages = product?.images || [];
//   const thumbnail =
//     productImages?.find((img) => img.is_featured)?.image_url ||
//     productImages[0]?.image_url ||
//     "";

//   const images = productImages.map((img) => ({
//     src: img.image_url,
//     alt: `Product image ${img.id}`, // or use product.name if you have it
//   }));

//   const [isReviewsVisible, setIsReviewsVisible] = useState(false);

//   const handleToggleReviews = () => {
//     setIsReviewsVisible((prevState) => !prevState);
//   };

//   if (error) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <p className="text-red-500">Error loading product: {error.message}</p>
//       </div>
//     );
//   }

//   return (
//     <QueryLoadingWrapper
//       isLoading={isLoading}
//       loadingMessage="Loading product details..."
//     >
//       <>
//         <ProductHeader />
//         <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
//           {/* Main Grid for Gallery and Info */}
//           {/* 1 column on mobile, 2 columns on large screens */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
//             {/* Left Column: Image Gallery */}
//             <div>
//               <ProductGallery thumbnail={thumbnail} images={images} />
//             </div>

//             {/* Right Column: Product Information */}
//             <div className="mt-8 lg:mt-0">
//               <ProductInfo
//                 product={product}
//                 onToggleReviews={handleToggleReviews}
//                 isReviewsVisible={isReviewsVisible}
//               />
//             </div>
//           </div>

//           <div
//             className={`overflow-hidden transition-all duration-500 ease-in-out ${isReviewsVisible
//               ? "max-h-[2000px] opacity-100"
//               : "max-h-0 opacity-0"
//               }`}
//           >
//             <div className="my-4"></div>

//             {loadingReviews ? (
//               <p className="py-6 text-center text-gray-500">
//                 Loading reviews...
//               </p>
//             ) : reviews.length === 0 ? (
//               <p className="py-6 text-center text-gray-500">
//                 No reviews yet for this product.
//               </p>
//             ) : (
//               <ProductReviews
//                 reviews={reviews}
//                 averageRating={averageRating}
//                 ratingDistribution={ratingDistribution}
//                 isLoading={loadingReviews}
//               />
//             )}
//           </div>

//           <div className="py-16 lg:py-16">
//             <h2 className="mb-8 text-2xl font-bold">You may also like</h2>
//           </div>
//         </main>
//         <Footer />
//       </>
//     </QueryLoadingWrapper>
//   );
// };


function ProductDetailPage() {
  const { productId } = useParams();
  const { product, isLoading, error } = useProduct();
  const {
    reviews,
    averageRating,
    ratingDistribution,
    isLoading: loadingReviews,
  } = useReviews(productId);

  const [isReviewsVisible, setIsReviewsVisible] = useState(false);

  const handleToggleReviews = () => {
    setIsReviewsVisible((prevState) => !prevState);
  };

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Error loading product: {error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const productImages = product?.images || [];
  const thumbnail =
    productImages?.find((img) => img.is_featured)?.image_url ||
    productImages[0]?.image_url ||
    "";

  const images = productImages.map((img) => ({
    src: img.image_url,
    alt: `Product image ${img.id}`,
  }));

  return (
    <>
      <ProductHeader />
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Main Grid for Gallery and Info */}
        {/* 1 column on mobile, 2 columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          {/* Left Column: Image Gallery */}
          <div>
            <ProductGallery thumbnail={thumbnail} images={images} />
          </div>

          {/* Right Column: Product Information */}
          <div className="mt-8 lg:mt-0">
            <ProductInfo
              product={product}
              onToggleReviews={handleToggleReviews}
              isReviewsVisible={isReviewsVisible}
            />
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isReviewsVisible
            ? "max-h-[2000px] opacity-100"
            : "max-h-0 opacity-0"
            }`}
        >
          <div className="my-4"></div>
          {loadingReviews ? (
            <p className="py-6 text-center text-gray-500">
              Loading reviews...
            </p>
          ) : reviews.length === 0 ? (
            <p className="py-6 text-center text-gray-500">
              No reviews yet for this product.
            </p>
          ) : (
            <ProductReviews
              reviews={reviews}
              averageRating={averageRating}
              ratingDistribution={ratingDistribution}
              isLoading={loadingReviews}
            />
          )}
        </div>

        <div className="py-16 lg:py-16">
          <h2 className="mb-8 text-2xl font-bold">You may also like</h2>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetailPage;