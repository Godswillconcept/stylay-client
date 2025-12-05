// import { useQuery } from "@tanstack/react-query";
// import { getAdminProduct } from "../../../services/apiAdminProduct";

// export function useAdminProduct() {
//     const { data, isLoading, error } = useQuery({
//         queryKey: ["adminProduct"],
//         queryFn: getAdminProduct,
//         retry: false,
//     });
//     console.log("Admin product use", data);

//     return { adminProduct: data || [], isLoading, error };
// }
import { useQuery } from "@tanstack/react-query";
import { getAdminProduct } from "../../../services/apiAdminProduct";

export function useAdminProduct(page = 1, limit = 9) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["adminProduct", page, limit],
        queryFn: () => getAdminProduct(page, limit),
        retry: false,
        keepPreviousData: true, // Keep previous data while fetching new page
    });

    return {
        adminProduct: data?.data || [],
        total: data?.total || 0,
        count: data?.count || 0,
        isLoading,
        error
    };
}