import RecentlyViewedCard from "./RecentlyViewedCard";
import PaginatedGrid from "./PaginatedGrid";

const recentlyViewedProducts = [
  {
    id: 1,
    category: "Cotton T Shirt",
    name: "Full Sleeve Zipper",
    price: 199,
    imageUrl: "/productImg/productImg2.png",
    inStock: true,
  },
  {
    id: 2,
    category: "Sweatshirt",
    name: "Essential Crewneck",
    price: 120,
    imageUrl: "/productImg/productImg5.png",
    inStock: true,
  },
  {
    id: 3,
    category: "Sweatshirt",
    name: "Essential Crewneck",
    price: 120,
    imageUrl: "/productImg/productImg6.png",
    inStock: false,
  },
  {
    id: 4,
    category: "Men's Formal",
    name: "Classic Business Set",
    price: 350,
    imageUrl: "/productImg/productImg7.png",
    inStock: true,
  },
  {
    id: 5,
    category: "Outerwear",
    name: "Vibrant Windbreaker",
    price: 250,
    imageUrl: "/productImg/productImg8.png",
    inStock: false,
  },
  {
    id: 6,
    category: "Cotton T Shirt",
    name: "Full Sleeve Zipper",
    price: 199,
    imageUrl: "/productImg/productImg9.png",
    inStock: true,
  },
  {
    id: 7,
    category: "Sweatshirt",
    name: "Essential Crewneck",
    price: 120,
    imageUrl: "/productImg/productImg10.png",
    inStock: false,
  },
  {
    id: 8,
    category: "Sweatshirt",
    name: "Essential Crewneck",
    price: 120,
    imageUrl: "/productImg/productImg11.png",
    inStock: true,
  },
  {
    id: 9,
    category: "Men's Formal",
    name: "Classic Business Set",
    price: 350,
    inStock: true,
    imageUrl: "/productImg/productImg12.png",
  },
  {
    id: 10,
    category: "Outerwear",
    name: "Vibrant Windbreaker",
    price: 250,
    inStock: false,
    imageUrl: "/productImg/productImg13.png",
  },
];

function RecentPage() {
  // const [visibleCount, setVisibleCount] = useState(6);
  // const navigate = useNavigate();

  // const handleViewMore = () => {
  //   setVisibleCount((prev) =>
  //     Math.min(prev + 6, recentlyViewedProducts.length),
  //   );
  // };

  // // Handle empty state
  // if (!recentlyViewedProducts || recentlyViewedProducts.length === 0) {
  //   return (
  //     <section className="w-full py-12 text-center">
  //       <h2 className="mb-4 text-xl font-semibold text-neutral-800">
  //         You haven’t viewed any products yet
  //       </h2>
  //       <p className="mb-6 text-neutral-600">
  //         Browse our collection to find something you like!
  //       </p>
  //       <button
  //         onClick={() => navigate("/shop")}
  //         className="rounded-lg bg-neutral-800 px-6 py-2 font-medium text-white transition hover:bg-black"
  //       >
  //         Go to Shop
  //       </button>
  //     </section>
  //   );
  // }

  // return (
  //   <section className="w-full">
  //     <h2 className="p-3.5 text-2xl font-bold tracking-widest text-neutral-800">
  //       Recently Viewed
  //     </h2>

  //     {/* Grid for Products */}
  //     <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  //       {recentlyViewedProducts.slice(0, visibleCount).map((product) => (
  //         <RecentlyViewedCard key={product.id} product={product} />
  //       ))}
  //     </div>

  //     {/* View More Button */}
  //     {visibleCount < recentlyViewedProducts.length && (
  //       <div className="mt-8 text-center">
  //         <button
  //           onClick={handleViewMore}
  //           className="rounded-lg bg-neutral-800 px-6 py-2 font-medium text-white transition hover:bg-black"
  //         >
  //           View More
  //         </button>
  //       </div>
  //     )}
  //   </section>
  // );
  return (
    <PaginatedGrid
      title="Recently Viewed"
      products={recentlyViewedProducts}
      CardComponent={RecentlyViewedCard}
      emptyTitle="You haven’t viewed any products yet"
      emptyDescription="Browse our collection to find something you like!"
      emptyRedirect="/shop"
      emptyRedirectLabel="Go to Shop"
    />
  );
}

export default RecentPage;

// ...more products
// function RecentPage() {
//   return (
//     <ProductSet title="Recently Viewed" products={recentlyViewedProducts} />
//   );
// }

// export default RecentPage;
