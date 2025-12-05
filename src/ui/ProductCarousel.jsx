import useEmblaCarousel from "embla-carousel-react";
import { useState, useCallback, useEffect } from "react";
import ProductCard from "./ProductCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function ProductCarousel({
  totalItems = 50,
  className = "",
  itemsPerSlide = {
    default: 2,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  }, newArrival = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 5,
    breakpoints: {
      "(min-width: 1280px)": { slidesToScroll: 5 },
      "(min-width: 1024px)": { slidesToScroll: 4 },
      "(min-width: 768px)": { slidesToScroll: 3 },
      "(min-width: 640px)": { slidesToScroll: 2 },
    },
  });


  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Title / Item Count */}
        <div className="mb-6 text-center">
          New Arrivals
          <span className="text-xl font-semibold">
            ({newArrival?.length})
          </span>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {newArrival.map((product) => (
              <div
                key={product.id}
                className={`embla__slide flex-[0_0_calc(100%/2)] px-2 sm:flex-[0_0_calc(100%/2)] md:flex-[0_0_calc(100%/3)] lg:flex-[0_0_calc(100%/4)] xl:flex-[0_0_calc(100%/5)]`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-neutral-700 transition-colors hover:bg-neutral-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-neutral-700 transition-colors hover:bg-neutral-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCarousel;


// function Pagination({ count }) {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const currentPage = !searchParams.get("page")
//     ? 1
//     : Number(searchParams.get("page"));

//   const pageCount = Math.ceil(count / PAGE_SIZE);

//   function nextPage() {
//     const next = currentPage === pageCount ? currentPage : currentPage + 1;

//     searchParams.set("page", next);
//     setSearchParams(searchParams);
//   }

//   function prevPage() {
//     const prev = currentPage === 1 ? currentPage : currentPage - 1;

//     searchParams.set("page", prev);
//     setSearchParams(searchParams);
//   }

//   if (pageCount <= 1) return null;

//   return (
//     <StyledPagination>
//       <P>
//         Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
//         <span>
//           {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
//         </span>{" "}
//         of <span>{count}</span> results
//       </P>

//       <Buttons>
//         <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
//           <HiChevronLeft /> <span>Previous</span>
//         </PaginationButton>

//         <PaginationButton
//           onClick={nextPage}
//           disabled={currentPage === pageCount}
//         >
//           <span>Next</span>
//           <HiChevronRight />
//         </PaginationButton>
//       </Buttons>
//     </StyledPagination>
//   );
// }

// export default Pagination;
