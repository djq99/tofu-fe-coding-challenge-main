import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { fetchPlaybook } from "../../utils/endpoints/playbook";

export const useFetchPlaybook = (
  payload?: {
    playbookId?: Parameters<typeof fetchPlaybook>[0];
  },
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof fetchPlaybook>>, Error>,
    "initialData"
  > & { initialData?: () => undefined; readFromCache?: boolean }
) => {
  const playbookQueryKey = payload?.playbookId
    ? ["playbook", payload.playbookId]
    : ["playbook"];
  const queryKey = playbookQueryKey;

  const {
    data: playbook,
    isLoading: fetchingPlaybook,
    isFetching: isLoadingOrRefetchingPlaybook,
    error: fetchingPlaybookError,
    dataUpdatedAt: playbookDataUpdatedAt,
  } = useQuery({
    ...options,
    queryKey,
    queryFn: async () => {
      const playbookData = await fetchPlaybook(payload?.playbookId);

      if (Array.isArray(playbookData)) {
        return playbookData[0];
      } else {
        return playbookData;
      }
    },
  });

  return {
    playbook,
    fetchingPlaybook,
    isLoadingOrRefetchingPlaybook,
    fetchingPlaybookError,
    playbookDataUpdatedAt,
  };
};
