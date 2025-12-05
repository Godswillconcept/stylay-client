import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout as logoutApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            queryClient.removeQueries({ queryKey: ["user"] });

            toast.success("Logout successful");
            navigate("/");
        },
        onError: () => {
            toast.error("Logout failed");
        }
    });
    return { logout, isPending };
}
