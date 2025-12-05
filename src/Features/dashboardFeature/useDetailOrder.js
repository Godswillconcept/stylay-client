// useOrderDetail.js
import { useQuery } from "@tanstack/react-query";
import { updateOrderStatus } from "../../services/apiUser";
// import { updateOrderStatus } from "../../../services/apiOrders"; // adjust the path

export function useOrderDetail(orderId, enabled) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["order", orderId],
        queryFn: () => updateOrderStatus(orderId),
        enabled, // only run when modal opens
    });
    return {
        orderDetail: data?.data?.order || {},
        isLoading,
        error,
    };
}
