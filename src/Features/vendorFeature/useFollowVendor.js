import { useMutation } from "@tanstack/react-query";
import { followVendor as followVendorApi } from "../../services/apiVendors";
import toast from "react-hot-toast";

export const useFollowVendor = () => {

    const { mutate: followVendor, isLoading, isError, error, isSuccess, data } = useMutation({
        mutationFn: async (vendorId) => {
            try {
                const response = await followVendorApi(vendorId);
                return response;
            } catch (error) {
                throw error; // Re-throw to let React Query handle the error
            }
        },
        onSuccess: (data) => {
            toast.success('Vendor followed successfully');
        },
        onError: (error) => {
            toast.error('Failed to follow vendor');
        },
    });

    return {
        followVendor,
        isLoading,
        isError,
        error,
        isSuccess,
        data
    };
};