import { PAGE_SIZE } from "../utils/constants";
import axiosInstance from "./axios";

export async function getVendorsList({ page, limit = PAGE_SIZE }) {
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

export async function getAdminVendorById(vendorId) {
  try {
    const { data } = await axiosInstance.get(
      `/admin/dashboard/vendor-overview/${vendorId}`,
    );
    return data?.data || {};
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to get vendor application details",
    );
  }
}
