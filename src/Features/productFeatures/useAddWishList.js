import { useMutation } from "@tanstack/react-query";
import { addToWishList as addToWishListApi } from "../../services/apiProduct";
import toast from "react-hot-toast";

export function useAddWishList() {
    const { mutate: addToWishList, isLoading: isAddingToWishList, isError, error, isSuccess } = useMutation({
        mutationFn: async (productId) => {
            try {
                const response = await addToWishListApi(productId);
                return response;
            } catch (error) {
                throw error; // Re-throw to let React Query handle the error
            }
        },
        onSuccess: (data) => {
            toast.success('Product added to wishlist successfully');
        },
        onError: (error) => {
            toast.error('Failed to add product to wishlist');
        },
    });

    return {
        addToWishList,
        isAddingToWishList,
        isError,
        error,
        isSuccess
    };
}