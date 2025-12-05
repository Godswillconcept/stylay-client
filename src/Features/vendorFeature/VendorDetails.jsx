// import { useParams, useNavigate } from "react-router-dom";
// import { BsHeart } from "react-icons/bs";
// import ProductSet from "../../ui/ProductSet";
// import Pagination from "../../ui/Pagination";
// import { useVendor } from "./useVendor";
// import { useVendorProducts } from "./useVendorProducts";
// import { getPlaceholder } from "../../utils/helper";
// import { useFollowVendor } from "./useFollowVendor";

// function VendorDetails() {
//   const navigate = useNavigate();
//   const { vendorId } = useParams();
//   const { vendor, isLoading: isLoadingVendor } = useVendor(vendorId);
//   const {
//     products = [],
//     isLoading: isLoadingProducts,
//     error: productsError,
//     count: total = 0
//   } = useVendorProducts(vendorId);

//   const { followVendor } = useFollowVendor();

//   if (isLoadingVendor || isLoadingProducts) {
//     return <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="animate-spin h-12 w-12 border-4 border-t-transparent rounded-full" />
//     </div>
//   }

//   console.log("vendor details", vendor);

//   if (!vendor) {
//     return <div>Vendor not found</div>;
//   }

//   const { first_name, last_name, country, profile_image } = vendor?.User || {};
//   const { description: bio } = vendor?.store || {};
//   const name = `${first_name || ''} ${last_name || ''}`.trim();

//   return (
//     <div className="p-6">
//       <div className="flex items-center gap-2 px-4 py-2">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-neutral-600 hover:text-black"
//         >
//           <span className="text-lg">&larr;</span>
//           <span className="ml-1 text-sm font-medium">Back</span>
//         </button>
//         <p className="font-bold text-neutral-700">Vendor's Details</p>
//       </div>

//       <div className="mt-6 mb-6 flex flex-col items-center gap-6 rounded-lg p-6 shadow-lg md:flex-row md:items-start md:justify-center">
//         <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-neutral-700 md:h-40 md:w-40">
//           <img
//             src={profile_image || getPlaceholder(first_name, last_name)}
//             alt={name || 'Vendor'}
//             className="h-full w-full object-cover"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = getPlaceholder(first_name, last_name);
//             }}
//           />
//         </div>

//         <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
//           <div className="text-center md:text-left">
//             <h1 className="text-3xl font-bold"><span>{name || 'Vendor'}</span></h1>
//             {country && <p className="mt-1 text-xl">{country}</p>}
//             {bio && <p className="mt-3 max-w-4xl text-neutral-300">{bio}</p>}
//           </div>

//           <div className="flex justify-center md:justify-start">
//             <button onClick={() => followVendor(vendor.id)} className="mt-4 flex items-center gap-2 rounded-full border border-black px-6 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white">
//               <BsHeart size={18} />
//               <span>Follow</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Products Section */}
//       {isLoadingProducts ? (
//         <div className="flex justify-center items-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           <span className="ml-3 text-gray-600">Loading products...</span>
//         </div>
//       ) : productsError ? (
//         <div className="p-4 text-red-500 text-center">{productsError.message}</div>
//       ) : (
//         <>
//           <ProductSet
//             title="All Vendor's Products"
//             products={products}
//             showViewMore={false}
//           />
//           <Pagination count={total} />
//         </>
//       )}
//     </div>
//   );
// }

// export default VendorDetails;

// import { useParams, useNavigate } from "react-router-dom";
// import { BsHeart, BsHeartFill } from "react-icons/bs";
// import ProductSet from "../../ui/ProductSet";
// import Pagination from "../../ui/Pagination";
// import { useVendorProducts } from "./useVendorProducts";
// import { getPlaceholder } from "../../utils/helper";
// // import { useFollowVendor } from "./useFollowVendor";
// // import { useFollowedVendors } from "./useFollowedVendors";
// import { useVendor } from "./useVendor";
// import { useFollowVendorCombine } from "./useFollowVendorCombine";
// import { useFollowVendorList } from "./useFollowVendorList";

// function VendorDetails() {
//   const navigate = useNavigate();
//   const { vendorId } = useParams();
//   const { vendor, isLoading: isLoadingVendor } = useVendor(vendorId);
//   const {
//     products = [],
//     isLoading: isLoadingProducts,
//     error: productsError,
//     count: total = 0
//   } = useVendorProducts(vendorId);

//   const { followedVendorIds, isLoading: isLoadingFollowed } = useFollowVendorList();
//   const { toggleFollow, isFollowing } = useFollowVendorCombine();

//   // Check if current vendor is followed
//   const isVendorFollowed = followedVendorIds?.has(vendorId);

//   if (isLoadingVendor || isLoadingProducts) {
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center">
//         <div className="animate-spin h-12 w-12 border-4 border-t-transparent rounded-full" />
//       </div>
//     );
//   }

//   if (!vendor) {
//     return <div>Vendor not found</div>;
//   }

//   const { first_name, last_name, country, profile_image } = vendor?.User || {};
//   const { description: bio } = vendor?.store || {};
//   const name = `${first_name || ''} ${last_name || ''}`.trim();

//   return (
//     <div className="p-6">
//       <div className="flex items-center gap-2 px-4 py-2">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-neutral-600 hover:text-black"
//         >
//           <span className="text-lg">&larr;</span>
//           <span className="ml-1 text-sm font-medium">Back</span>
//         </button>
//         <p className="font-bold text-neutral-700">Vendor's Details</p>
//       </div>

//       <div className="mt-6 mb-6 flex flex-col items-center gap-6 rounded-lg p-6 shadow-lg md:flex-row md:items-start md:justify-center">
//         <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-neutral-700 md:h-40 md:w-40">
//           <img
//             src={profile_image || getPlaceholder(first_name, last_name)}
//             alt={name || 'Vendor'}
//             className="h-full w-full object-cover"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = getPlaceholder(first_name, last_name);
//             }}
//           />
//         </div>

//         <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
//           <div className="text-center md:text-left">
//             <h1 className="text-3xl font-bold">
//               <span>{name || 'Vendor'}</span>
//             </h1>
//             {country && <p className="mt-1 text-xl">{country}</p>}
//             {bio && <p className="mt-3 max-w-4xl text-neutral-300">{bio}</p>}
//           </div>

//           <div className="flex justify-center md:justify-start">
//             <button
//               onClick={() => toggleFollow(vendorId, isVendorFollowed)}
//               disabled={isFollowing || isLoadingFollowed}
//               className={`mt-4 flex items-center gap-2 rounded-full border px-6 py-2 text-sm font-semibold transition ${isVendorFollowed
//                 ? "border-red-500 bg-red-500 text-white hover:bg-red-600"
//                 : "border-black text-black hover:bg-black hover:text-white"
//                 } disabled:opacity-50 disabled:cursor-not-allowed`}
//             >
//               {isVendorFollowed ? (
//                 <BsHeartFill size={18} />
//               ) : (
//                 <BsHeart size={18} />
//               )}
//               <span>{isVendorFollowed ? "Following" : "Follow"}</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Products Section */}
//       {isLoadingProducts ? (
//         <div className="flex justify-center items-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           <span className="ml-3 text-gray-600">Loading products...</span>
//         </div>
//       ) : productsError ? (
//         <div className="p-4 text-red-500 text-center">{productsError.message}</div>
//       ) : (
//         <>
//           <ProductSet
//             title="All Vendor's Products"
//             products={products}
//             showViewMore={false}
//           />
//           <Pagination count={total} />
//         </>
//       )}
//     </div>
//   );
// }

// export default VendorDetails;

// import { useParams, useNavigate } from "react-router-dom";
// import { BsHeart, BsHeartFill } from "react-icons/bs";
// import ProductSet from "../../ui/ProductSet";
// import Pagination from "../../ui/Pagination";
// import { useVendorProducts } from "./useVendorProducts";
// import { getPlaceholder } from "../../utils/helper";
// import { useVendor } from "./useVendor";
// import { useFollowVendorCombine } from "./useFollowVendorCombine";
// import { useFollowVendorList } from "./useFollowVendorList";

// function VendorDetails() {
//   const navigate = useNavigate();
//   const { vendorId } = useParams();
//   const { vendor, isLoading: isLoadingVendor } = useVendor(vendorId);
//   const {
//     products = [],
//     isLoading: isLoadingProducts,
//     error: productsError,
//     count: total = 0
//   } = useVendorProducts(vendorId);

//   const { followedVendorIds, isLoading: isLoadingFollowed } = useFollowVendorList();
//   const { toggleFollow, isFollowing } = useFollowVendorCombine();

//   // Check if current vendor is followed - this will update reactively
//   const isVendorFollowed = followedVendorIds?.has(vendorId);

//   if (isLoadingVendor || isLoadingProducts) {
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center">
//         <div className="animate-spin h-12 w-12 border-4 border-t-transparent rounded-full" />
//       </div>
//     );
//   }

//   if (!vendor) {
//     return <div>Vendor not found</div>;
//   }

//   const { first_name, last_name, country, profile_image } = vendor?.User || {};
//   const { description: bio } = vendor?.store || {};
//   const name = `${first_name || ''} ${last_name || ''}`.trim();

//   return (
//     <div className="p-6">
//       <div className="flex items-center gap-2 px-4 py-2">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-neutral-600 hover:text-black"
//         >
//           <span className="text-lg">&larr;</span>
//           <span className="ml-1 text-sm font-medium">Back</span>
//         </button>
//         <p className="font-bold text-neutral-700">Vendor's Details</p>
//       </div>

//       <div className="mt-6 mb-6 flex flex-col items-center gap-6 rounded-lg p-6 shadow-lg md:flex-row md:items-start md:justify-center">
//         <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-neutral-700 md:h-40 md:w-40">
//           <img
//             src={profile_image || getPlaceholder(first_name, last_name)}
//             alt={name || 'Vendor'}
//             className="h-full w-full object-cover"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = getPlaceholder(first_name, last_name);
//             }}
//           />
//         </div>

//         <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
//           <div className="text-center md:text-left">
//             <h1 className="text-3xl font-bold">
//               <span>{name || 'Vendor'}</span>
//             </h1>
//             {country && <p className="mt-1 text-xl">{country}</p>}
//             {bio && <p className="mt-3 max-w-4xl text-neutral-300">{bio}</p>}
//           </div>

//           <div className="flex justify-center md:justify-start">
//             <button
//               onClick={() => toggleFollow(vendorId, isVendorFollowed)}
//               disabled={isFollowing || isLoadingFollowed}
//               className={`mt-4 flex items-center gap-2 rounded-full border px-6 py-2 text-sm font-semibold transition ${isVendorFollowed
//                 ? "border-red-500 bg-red-500 text-white hover:bg-red-600"
//                 : "border-black text-black hover:bg-black hover:text-white"
//                 } disabled:opacity-50 disabled:cursor-not-allowed`}
//             >
//               {/* Show spinner during mutation */}
//               {isFollowing ? (
//                 <>
//                   <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-current rounded-full" />
//                   <span>Processing...</span>
//                 </>
//               ) : (
//                 <>
//                   {isVendorFollowed ? (
//                     <BsHeartFill size={18} />
//                   ) : (
//                     <BsHeart size={18} />
//                   )}
//                   <span>{isVendorFollowed ? "Following" : "Follow"}</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Products Section */}
//       {isLoadingProducts ? (
//         <div className="flex justify-center items-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           <span className="ml-3 text-gray-600">Loading products...</span>
//         </div>
//       ) : productsError ? (
//         <div className="p-4 text-red-500 text-center">{productsError.message}</div>
//       ) : (
//         <>
//           <ProductSet
//             title="All Vendor's Products"
//             products={products}
//             showViewMore={false}
//           />
//           <Pagination count={total} />
//         </>
//       )}
//     </div>
//   );
// }

// export default VendorDetails;

import { useParams, useNavigate } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import ProductSet from "../../ui/ProductSet";
import Pagination from "../../ui/Pagination";
import { useVendorProducts } from "./useVendorProducts";
import { getPlaceholder } from "../../utils/helper";
import { useVendor } from "./useVendor";
import { useFollowVendorCombine } from "./useFollowVendorCombine";
import { useFollowVendorList } from "./useFollowVendorList";
import { useUser } from "../authentication/useUser";

function VendorDetails() {
  const navigate = useNavigate();
  const { vendorId } = useParams();
  const { user } = useUser();
  const { vendor, isLoading: isLoadingVendor } = useVendor(vendorId);
  const {
    products = [],
    isLoading: isLoadingProducts,
    error: productsError,
    count: total = 0
  } = useVendorProducts(vendorId);

  // Only fetch followed vendors list if user exists
  const {
    followedVendorIds,
    isLoading: isLoadingFollowed
  } = useFollowVendorList({
    enabled: !!user
  });

  const { toggleFollow, isFollowing } = useFollowVendorCombine();

  // Check if current vendor is followed
  const isVendorFollowed = followedVendorIds?.has(vendorId);

  const handleFollowClick = async () => {
    await toggleFollow(vendorId, isVendorFollowed);
  };

  if (isLoadingVendor || isLoadingProducts) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  const { first_name, last_name, country, profile_image } = vendor?.User || {};
  const { description: bio } = vendor?.store || {};
  const name = `${first_name || ''} ${last_name || ''}`.trim();

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 px-4 py-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-neutral-600 hover:text-black"
        >
          <span className="text-lg">&larr;</span>
          <span className="ml-1 text-sm font-medium">Back</span>
        </button>
        <p className="font-bold text-neutral-700">Vendor's Details</p>
      </div>

      <div className="mt-6 mb-6 flex flex-col items-center gap-6 rounded-lg p-6 shadow-lg md:flex-row md:items-start md:justify-center">
        <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-neutral-700 md:h-40 md:w-40">
          <img
            src={profile_image || getPlaceholder(first_name, last_name)}
            alt={name || 'Vendor'}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getPlaceholder(first_name, last_name);
            }}
          />
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">
              <span>{name || 'Vendor'}</span>
            </h1>
            {country && <p className="mt-1 text-xl">{country}</p>}
            {bio && <p className="mt-3 max-w-4xl text-neutral-300">{bio}</p>}
          </div>

          {/* Only show follow button if user is logged in */}
          {user && (
            <div className="flex justify-center md:justify-start">
              <button
                onClick={handleFollowClick}
                disabled={isFollowing}
                className={`mt-4 flex items-center gap-2 rounded-full border px-6 py-2 text-sm font-semibold transition ${isVendorFollowed
                  ? "border-red-500 bg-red-500 text-white hover:bg-red-600"
                  : "border-black text-black hover:bg-black hover:text-white"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isFollowing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-current rounded-full" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {isVendorFollowed ? (
                      <BsHeartFill size={18} />
                    ) : (
                      <BsHeart size={18} />
                    )}
                    <span>
                      {isVendorFollowed ? "Following" : "Follow"}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Products Section */}
      {isLoadingProducts ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading products...</span>
        </div>
      ) : productsError ? (
        <div className="p-4 text-red-500 text-center">{productsError.message}</div>
      ) : (
        <>
          <ProductSet
            title="All Vendor's Products"
            products={products}
            showViewMore={false}
          />
          <Pagination count={total} />
        </>
      )}
    </div>
  );
}

export default VendorDetails;