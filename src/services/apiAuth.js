import axiosInstance from "./axios";


// api endpoint for signup
export async function register(credentials) {
    try {
        const { data } = await axiosInstance.post("/auth/register", credentials);
        console.log(data);

        return data;
    }
    catch (error) {
        throw new Error(error.response?.data?.message || "Registration failed");
    }

}

// api endpoint for verify email
export async function verifyEmail(credentials) {
    try {
        const { data } = await axiosInstance.post("/auth/verify-email", credentials);
        console.log(data);

        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Verification failed");
    }
}


// api endpoint for resend verification
export async function resendVerification(email) {
    try {
        const { data } = await axiosInstance.post("/auth/resend-verification", { email });
        return data;
    }
    catch (error) {
        throw new Error(error.response?.data?.message || "Resend verification failed");
    }
}




// api endpoint for login
export async function login(credentials) {
    try {
        const { data } = await axiosInstance.post("/auth/login", credentials);
        return data;
    }
    catch (error) {
        throw new Error(error.response?.data?.message || "Login failed");
    }
}

// api endpoint for get current user
export async function currentUser() {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const { data } = await axiosInstance.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
        });
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to get user profile");
    }
}





// api endpoint for logout
export async function logout() {
    try {
        await axiosInstance.get("/auth/logout");
    }
    catch (error) {
        throw new Error("Logout failed");
    }
}

export async function updatePassword(credentials) {
    try {
        const { data } = await axiosInstance.patch("/auth/update-password", credentials);
        return data;
    }
    catch (error) {
        throw new Error(error.response?.data?.message || "Update password failed");
    }
}

// api endpoint for forgot password
export async function forgotPassword(credentials) {
    try {
        const { data } = await axiosInstance.post("/auth/forgot-password", credentials);
        return data;
    }
    catch (error) {
        throw new Error(error.response?.data?.message || "Forgot password failed");
    }

}

export async function forgotPasswordReset(credentials) {
    const { reset_token, ...rest } = credentials;
    try {
        const { data } = await axiosInstance.post(`/auth/reset-password/${reset_token}`, rest);
        return data;
    }
    catch (error) {
        throw new Error(error.response?.data?.message || "Reset password failed");
    }
}


