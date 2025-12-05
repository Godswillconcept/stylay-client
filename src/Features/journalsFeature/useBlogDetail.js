import { useParams } from "react-router";
import { getBlogById } from "../../services/apiBlog";
import { useQuery } from "@tanstack/react-query";

export function useBlogDetail() {
    const { journalId } = useParams();

    const { data, isLoading, error } = useQuery({
        queryKey: ["blog", journalId],
        queryFn: () => getBlogById(journalId),
        enabled: !!journalId,
        retry: false,
    });

    console.log("blog use", data);

    return {
        blog: data?.data || {},
        isLoading,
        error,
    };
}