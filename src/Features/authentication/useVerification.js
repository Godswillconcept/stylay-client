// import { useMutation } from "@tanstack/react-query";
// import { verifyEmail } from "../../services/apiAuth";


// export function useVerification() {
//     const { mutate: verify, isPending, isError, error } = useMutation({
//         mutationFn: verifyEmail,
//     });

//     return { verify, isPending, isError, error };
// }

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyEmail } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useVerification() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: verify, isPending, isError, error } = useMutation({
        mutationFn: verifyEmail,
        onSuccess: (response) => {
            console.log(response);

            // Save token + user after verification
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("loginTime", Date.now().toString());

            queryClient.setQueryData(["user"], response.data);

            toast.success("Verification successful, you're now logged in!");
            navigate("/landing");
        },
        onError: () => {
            toast.error("Verification failed");
        },
    });

    return { verify, isPending, isError, error };
}

