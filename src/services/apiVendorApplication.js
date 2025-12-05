import { PAGE_SIZE } from "../utils/constants";
import axiosInstance from "./axios";

export async function getVendorApplications({ page, limit = PAGE_SIZE }) {
  try {
    const { data } = await axiosInstance.get(
      "/admin/dashboard/vendor-onboarding-stats",
      {
        params: { page, limit },
      },
    );
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get vendor applications",
    );
  }
}

export async function getVendorApplicationById(vendorId) {
  try {
    const res = await axiosInstance.get(`/vendors/${vendorId}`);
    // console.log("RAW API response:", res.data);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to get vendor application details",
    );
  }
}
