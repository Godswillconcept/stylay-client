import { useQuery, useQueryClient } from "@tanstack/react-query";
import { currentUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export function useUser() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: currentUser,
        initialData: () => {
            try {
                const storedUser = localStorage.getItem("user");
                return storedUser ? JSON.parse(storedUser) : undefined;
            } catch {
                return undefined;
            }
        },
        staleTime: Infinity,
        retry: false,
    });

    useEffect(() => {
        if (error?.isAuthError) {
            // Token/user invalid → logout
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            queryClient.removeQueries(["user"]);
            toast.error("Your session has expired. Please log in again.");
            navigate("/login");
        } else if (error) {
            // Just show error but don't logout
            // toast.error(error.message);
        }
    }, [error, queryClient, navigate]);

    return {
        user: data || null,
        isLoading,
        error,
    };
}
