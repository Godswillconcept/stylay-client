import { useQuery } from "@tanstack/react-query";
import { getVendorDashboardStats } from "../../services/apiVendors";

export function useVendorDashBoardStats() {
    const { data, isLoading, } = useQuery({
        queryKey: ["vendor-dashboard-stats"],
        queryFn: () => getVendorDashboardStats(),
    });

    return {
        stats: data?.data || [],
        isLoading,

    };
}
