import axiosInstance from "./axios";

export async function submitVendorApplication(formData) {
  try {
    const { data } = await axiosInstance.post("/vendors", formData);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to submit vendor application",
    );
  }
}
