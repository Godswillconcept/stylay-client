import { PAGE_SIZE } from "../utils/constants";
import axiosInstance from "./axios";

export async function getAdminOrders({ page, limit = PAGE_SIZE }) {
  try {
    const { data } = await axiosInstance.get("/admin/orders", {
      params: { page, limit },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get admin orders",
    );
  }
}

export async function getAdminOrderDetails(orderId) {
  try {
    const { data } = await axiosInstance.get(`/admin/orders/${orderId}`);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get admin order details",
    );
  }
}
