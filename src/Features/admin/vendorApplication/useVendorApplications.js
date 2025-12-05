import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getVendorApplications } from "../../../services/apiVendorApplication";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";

export function useVendorApplications() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // PAGE
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: applications, total } = {},
    error,
  } = useQuery({
    queryKey: ["vendor-applications", page],
    queryFn: () => getVendorApplications({ page }),
    keepPreviousData: true,
    onSuccess: (data) => {
      queryClient.setQueryData(["vendor-applications", page], data);
    },
  });

  // PREFETCH NEXT + PREV PAGES
  const pageCount = Math.ceil(total / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["vendor-applications", page + 1],
      queryFn: () => getVendorApplications({ page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["vendor-applications", page - 1],
      queryFn: () => getVendorApplications({ page: page - 1 }),
    });
  }

  return { applications, total, isLoading, error };
}
