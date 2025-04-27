import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchContentGroup,
  updateContentGroup,
} from "../../utils/endpoints/contentGroup";
import merge from "lodash/fp/merge";
import { UpdateParams, UpdateContext } from "types/generic";

export const useFetchContentGroup = (id) => {
  const {
    data: contentGroup,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["contentGroup", id],
    queryFn: async () => {
      const contentGroup = await fetchContentGroup(id);
      return contentGroup;
    },
    enabled: !!id,
  });

  return { contentGroup, isLoading, error, refetch };
};

function mergeWithOverride(oldData, payload) {
  // Bc custom instructions and components can be removed, so directly override custom instructions and components
  const newData = {
    ...oldData,
    components: payload?.components
      ? payload.components
      : oldData?.components ?? {},
  };

  if (payload?.content_group_params?.custom_instructions) {
    // fix the shallow copy not rerender view issue
    newData.content_group_params = {
      ...newData.content_group_params,
      custom_instructions: payload.content_group_params.custom_instructions,
    };
  }

  // merge the rest of the payload with the new data
  return merge(newData, payload);
}

export const useUpdateContentGroup = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, error, isSuccess } = useMutation<
    ReturnType<typeof updateContentGroup>,
    Error,
    UpdateParams,
    UpdateContext
  >(
    async ({ id, payload }) => {
      return await updateContentGroup(id, payload);
    },
    {
      onMutate: async ({ id, payload, skipOptimisticUpdate = false }) => {
        if (skipOptimisticUpdate) return;
        await queryClient.cancelQueries(["contentGroup", id]);
        const previous = queryClient.getQueryData(["contentGroup", id]);

        queryClient.setQueryData(["contentGroup", id], (oldData: any) => {
          // this will do a deep merge of the old data and the new data so we can omit fields in content_group_params (for example) and they will still be there
          const mergedData = mergeWithOverride(oldData, payload);
          return mergedData;
        });

        return { previous };
      },
      onSuccess: async (data: any, { id, invalidateCache = false }) => {
        const campaignId = data?.campaign;
        let queriesToInvalidate: Promise<void>[] = [];
        if (!campaignId) return;
        queriesToInvalidate.push(
          queryClient.invalidateQueries(["campaign", campaignId])
        );
        if (invalidateCache) {
          queriesToInvalidate.push(
            queryClient.invalidateQueries(["contentGroup", id])
          );
        }
        await Promise.all(queriesToInvalidate);
        return data;
      },
      onError: (error, { id }, context) => {
        // Rollback to the previous states in case of an error
        queryClient.setQueryData(["contentGroup", id], context?.previous);
        console.error("API error:", error);
        return error;
      },
    }
  );

  return {
    updateContentGroup: mutateAsync,
    isLoading,
    isSuccess,
    error,
  };
};
