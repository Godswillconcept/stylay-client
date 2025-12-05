import { unfollowVendor as unfollowVendorApi } from "../../services/apiVendors";

export const useUnfollowVendor = () => {
    const { mutate: unfollowVendor, isLoading, isError, error, isSuccess, data } = useMutation({
        mutationFn: async (vendorId) => {
            try {
                const response = await unfollowVendor(vendorId);
                return response;
            } catch (error) {
                throw error; // Re-throw to let React Query handle the error
            }
        },
        onSuccess: (data) => {
            toast.success('Vendor unfollowed successfully');
        },
        onError: (error) => {
            toast.error('Failed to unfollow vendor');
        },
    });
}
