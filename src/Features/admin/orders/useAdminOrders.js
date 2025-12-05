import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminOrders } from "../../../services/apiAdminOrders";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";

export function useAdminOrders() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: orders, total } = {},
    error,
  } = useQuery({
    queryKey: ["admin-orders", page],
    queryFn: () => getAdminOrders({ page }),
    keepPreviousData: true,
    onSuccess: (data) => {
      queryClient.setQueryData(["admin-orders", page], data);
    },
  });

  const pageCount = Math.ceil(total / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["admin-orders", page + 1],
      queryFn: () => getAdminOrders({ page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["admin-orders", page - 1],
      queryFn: () => getAdminOrders({ page: page - 1 }),
    });
  }

  return { orders, total, isLoading, error };
}
