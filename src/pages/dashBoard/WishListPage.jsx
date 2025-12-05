import WishlistCard from "../../ui/WishlistCard";
import PaginatedGrid from "./PaginatedGrid";
import { useWishlist } from "../../Features/productFeatures/useWishlist";
import { useRemoveWishlist } from "../../Features/productFeatures/useRemovewishlist";
import { useNavigate } from "react-router-dom";

// const wishlistProducts = [
//   {
//     id: 1,
//     name: "Full Sleeve Zipper",
//     price: 199,
//     thumbnail: "/productImg/productImg2.png",
//     inStock: true,
//     Category: {
//       name: "Cotton T Shirt"
//     }
//   },
//   {
//     id: 2,
//     name: "Essential Crewneck",
//     price: 120,
//     thumbnail: "/productImg/productImg5.png",
//     inStock: true,
//     Category: {
//       name: "Sweatshirt"
//     }
//   },
//   {
//     id: 3,
//     name: "Essential Crewneck",
//     price: 120,
//     thumbnail: "/productImg/productImg6.png",
//     inStock: false,
//     Category: {
//       name: "Sweatshirt"
//     }
//   },
//   {
//     id: 4,
//     name: "Classic Business Set",
//     price: 350,
//     thumbnail: "/productImg/productImg7.png",
//     inStock: true,
//     Category: {
//       name: "Men's Formal"
//     }
//   },
//   {
//     id: 5,
//     name: "Vibrant Windbreaker",
//     price: 250,
//     thumbnail: "/productImg/productImg8.png",
//     inStock: false,
//     Category: {
//       name: "Outerwear"
//     }
//   },
//   {
//     id: 6,
//     name: "Full Sleeve Zipper",
//     price: 199,
//     thumbnail: "/productImg/productImg9.png",
//     inStock: true,
//     Category: {
//       name: "Cotton T Shirt"
//     }
//   },
//   {
//     id: 7,
//     name: "High Rise Skinny Jeans",
//     price: 199,
//     thumbnail: "/productImg/productImg10.png",
//     inStock: true,
//     Category: {
//       name: "Joggers"
//     }
//   },
// ];

// Wrapper component to adapt WishlistCard for PaginatedGrid
// const WishlistItem = ({ item, onRemove, onAddToCart }) => {
//   // Map the product data to match WishlistCard's expected props
//   const wishlistProduct = {
//     ...item,
//     image: item.thumbnail,
//     title: item.name
//   };

//   return (
//     <WishlistCard
//       product={wishlistProduct}
//       onRemove={onRemove}
//       onAddToCart={onAddToCart}
//     />
//   );
// };

// import WishlistCard from "../../ui/WishlistCard";
// import PaginatedGrid from "./PaginatedGrid";
// import { useWishlist } from "../../Features/productFeatures/useWishlist";

const WishlistItem = ({ item, onRemove, onAddToCart }) => (
  <WishlistCard
    product={item}
    onRemove={() => onRemove(item.wishlistId)}
    onAddToCart={() => onAddToCart(item)}
  />
);

function WishListPage() {
  const navigate = useNavigate();
  const { wishlist, isLoading } = useWishlist();
  const { removeFromWishlist, isRemovingFromWishlist } = useRemoveWishlist();

  const handleRemoveFromWishlist = (wishlistId) => {
    console.log("Removing wishlist item:", wishlistId);
    removeFromWishlist(wishlistId);
  };

  const handleAddToCart = (product) => {
    // Navigate to the product detail page
    navigate(`/product/${product.id}`);
  };

  const WishlistCardWithHandlers = ({ item }) => (
    <WishlistItem
      item={item}
      onRemove={handleRemoveFromWishlist}
      onAddToCart={() => navigate(`/product/${item.id}`)}
    />
  );

  return (
    <div className="p-6">
      <PaginatedGrid
        title="My Wishlist"
        items={wishlist}
        isLoading={isLoading}
        CardComponent={WishlistCardWithHandlers}
        emptyTitle="Your wishlist is empty"
        emptyDescription="Start saving your favorite items here!"
        emptyRedirect="/shop"
        emptyRedirectLabel="Go to Shop"
      />
    </div>
  );
}

export default WishListPage;
