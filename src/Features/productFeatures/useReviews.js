// // useReviews.js
// import { useQuery } from "@tanstack/react-query";
// import { getReviews } from "../../services/apiProduct";

// export default function useReviews(productId) {
//     const { data, isLoading, error } = useQuery({
//         queryKey: ["reviews", productId],
//         queryFn: () => getReviews(productId),
//         enabled: !!productId, // ensures query runs only when productId is available
//     });

//     // Extract only what you need (e.g. data, product info)
//     return {
//         reviews: data?.data || [],
//         product: data?.product || null,
//         isLoading,
//         error,
//     };
// }


// import { useQuery } from "@tanstack/react-query";
// import { getReviews } from "../../services/apiProduct";

// export default function useReviews(productId) {
//     const { data, isLoading, error } = useQuery({
//         queryKey: ["reviews", productId],
//         queryFn: () => getReviews(productId),
//         enabled: !!productId, // only run if productId exists
//     });

//     // normalize data
//     const reviews = data?.data || [];

//     // Compute average rating
//     const averageRating =
//         reviews.length > 0
//             ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
//             : 0;

//     // Compute rating distribution
//     const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
//         const count = reviews.filter((r) => r.rating === star).length;
//         const percentage = reviews.length ? (count / reviews.length) * 100 : 0;
//         return { stars: star, count, percentage };
//     });

//     return {
//         reviews,
//         averageRating,
//         ratingDistribution,
//         isLoading,
//         error,
//     };
// }

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getReviews } from "../../services/apiProduct";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useReviews(productId) {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // Get current page from URL or default to 1
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

    const {
        data: { reviews = [], total = 0 } = {},
        isLoading,
        error
    } = useQuery({
        queryKey: ["reviews", productId, page],
        queryFn: () => getReviews(productId, { page }),
        enabled: !!productId,
        keepPreviousData: true,
    });

    // Prefetch the next page
    const pageCount = Math.ceil(total / PAGE_SIZE);

    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["reviews", productId, page + 1],
            queryFn: () => getReviews(productId, { page: page + 1 }),
        });
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["reviews", productId, page - 1],
            queryFn: () => getReviews(productId, { page: page - 1 }),
        });
    }

    // Compute average rating from all reviews (not just current page)
    const allReviews = queryClient.getQueryData(["reviews", productId, page])?.reviews || [];
    const averageRating = allReviews.length > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
        : 0;

    // Compute rating distribution from all reviews (not just current page)
    const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
        const count = allReviews.filter((r) => Math.round(r.rating) === star).length;
        const percentage = allReviews.length ? (count / allReviews.length) * 100 : 0;
        return { stars: star, count, percentage };
    });

    return {
        reviews,
        total,
        isLoading,
        error,
        averageRating,
        ratingDistribution,
    };
}