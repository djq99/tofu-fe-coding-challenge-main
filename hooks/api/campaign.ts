import { useQuery } from "@tanstack/react-query";
import { fetchCampaign } from "../../utils/endpoints/campaign";

export const useFetchCampaign = (
  campaignId: number,
  refetchOnWindowFocus = true
) => {
  const queryKey = ["campaign", campaignId];

  const {
    data: campaign,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async () => await fetchCampaign(campaignId),
    enabled: !!campaignId,
    refetchOnWindowFocus,
  });
  return { campaign, isLoading, isFetching, error, refetch };
};
