// import axios from "axios";

// // Create axios instance with ngrok URL
// const api = axios.create({
//   baseURL:
//     import.meta.env.STYLAY_API_ENDPOINT ||
//     "https://merry-jennet-lenient.ngrok-free.app/api/v1",

//   headers: {
//     "Content-Type": "application/json",
//     "ngrok-skip-browser-warning": "true",
//     Accept: "application/json",
//   },
// });

// // Add a request interceptor to add the auth token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// // Add a response interceptor to handle common errors
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle token expiration (401) and try to refresh token
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (refreshToken) {
//           const response = await axios.post(
//             `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth/refresh-token`,
//             { refreshToken },
//           );

//           const { token, refreshToken: newRefreshToken } = response.data;
//           localStorage.setItem("token", token);
//           localStorage.setItem("refreshToken", newRefreshToken);

//           // Update the authorization header and retry the original request
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return api(originalRequest);
//         }
//       } catch (error) {
//         // If refresh token fails, clear auth and redirect to login
//         localStorage.removeItem("token");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login";
//         return Promise.reject(error);
//       }
//     }

//     // Handle other errors
//     if (error.response?.status === 403) {
//       // Handle forbidden access
//       console.error(
//         "Forbidden: You do not have permission to access this resource",
//       );
//     }

//     return Promise.reject(error);
//   },
// );

// export default api;

import axios from "axios";

// Create axios instance with ngrok URL
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://merry-jennet-lenient.ngrok-free.app/api/v1",

  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    Accept: "application/json",
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const currentPath = window.location.pathname;

    // Handle token expiration (401) and try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If user is on login page, let the error propagate normally
      if (currentPath === "/login") {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth/refresh-token`,
            { refreshToken },
          );

          const { token, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Update the authorization header and retry the original request
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } else {
          // No refresh token available, redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      } catch (refreshError) {
        // If refresh token fails, clear auth and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle forbidden access (403) - redirect to login
    if (error.response?.status === 403) {
      console.error(
        "Forbidden: You do not have permission to access this resource",
      );
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;