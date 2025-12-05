import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getVendorsList } from "../../../services/apiAdminVendorList";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";

export function useVendorList() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // PAGE
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: vendors, total } = {},
    error,
  } = useQuery({
    queryKey: ["vendor-list", page],
    queryFn: () => getVendorsList({ page }),
    keepPreviousData: true,
    onSuccess: (data) => {
      queryClient.setQueryData(["vendor-list", page], data);
    },
  });

  // PREFETCH NEXT + PREV PAGES
  const pageCount = Math.ceil(total / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["vendor-list", page + 1],
      queryFn: () => getVendorsList({ page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["vendor-list", page - 1],
      queryFn: () => getVendorsList({ page: page - 1 }),
    });
  }

  return { vendors, total, isLoading, error };
}
