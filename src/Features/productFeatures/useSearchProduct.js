// import { useQuery } from "@tanstack/react-query";


// import { searchProducts } from "../../services/apiProduct";

// export function useProductSearch(query, page = 1) {
//     const { data, isLoading, error } = useQuery({
//         queryKey: ["searchProducts", query, page],
//         queryFn: () => searchProducts(query, page),
//         enabled: !!query, // only run when query is not empty
//     });

//     return { products: data?.data || [], isLoading, error };
// }


// src/features/productfeatures/useSearchProduct.js
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../services/apiProduct";

export function useProductSearch(query, page = 1) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["searchProducts", query, page],
        queryFn: () => searchProducts(query, page),
        enabled: query.length >= 3,
    });

    return {
        products: data?.products || [], // ✅ corrected
        pagination: data?.pagination,
        isLoading,
        error,
    };
}
