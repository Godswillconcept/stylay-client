import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getVendorDashBoardProducts } from "../../services/apiVendors";

export function useVendorDashboardProduct(page = 1, limit = 10) {
    const queryClient = useQueryClient();

    // Fetch the current page
    const {
        data: { data: products, pagination } = { data: [], pagination: {} },
        isLoading,
        error,
        isError,
        isFetching,
        isPlaceholderData,
    } = useQuery({
        queryKey: ["vendor-dashboard-products", page],
        queryFn: () => getVendorDashBoardProducts({ page, limit }),
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Prefetch next page if there are more pages
    if (pagination?.hasNextPage) {
        queryClient.prefetchQuery({
            queryKey: ["vendor-dashboard-products", page + 1],
            queryFn: () => getVendorDashBoardProducts({ page: page + 1, limit }),
        });
    }

    return {
        products: products || [],
        pagination: {
            currentPage: pagination?.currentPage || page,
            totalPages: pagination?.totalPages || 1,
            totalItems: pagination?.totalItems || 0,
            hasNextPage: pagination?.hasNextPage || false,
            hasPreviousPage: pagination?.hasPreviousPage || false,
        },
        isLoading,
        isError,
        error: error?.message,
        isFetching,
        isPlaceholderData,
    };
}
