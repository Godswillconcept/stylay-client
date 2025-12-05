import { useQuery } from "@tanstack/react-query";
import { getAdminProductAnalysis } from "../../../services/apiAdminProduct";

export function useProductAnalysis(productId) {
    const {
        data: productAnalysis,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["admin-product-analysis", productId],
        queryFn: () => getAdminProductAnalysis(productId),

    });

    console.log("Admin product analysis", productAnalysis);

    return {
        productAnalysis: productAnalysis || {}, // ✅ default to object
        isLoading,
        isError,
        error,
    };
}