import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../../services/apiProduct";

export function useAdminProductDetail(productId, mode) {
    const {
        data: productData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["admin-product-detail", productId],
        queryFn: () => getProductById(productId),
        enabled: mode === "edit" && !!productId,
        staleTime: 1000 * 60, // 1 minute — prevents instant refetching
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    console.log("Admin product detail", productData);

    return {
        productData: productData?.data || {}, // ✅ default to object
        isLoading,
        isError,
        error,
    };
}
