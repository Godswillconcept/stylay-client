import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
    const queryClient = useQueryClient();

    const { mutate: signup, isPending } = useMutation({
        mutationFn: register,
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user);
            toast.success("Registration successful, Please verify the new account from the user's email address.");
        },
        onError: (err) => {
            // Forward the error to the component instead of just showing a toast
            throw err;
        }
    });
    return { signup, isPending };
}
