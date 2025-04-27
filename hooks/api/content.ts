import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchContent,
  updateContent,
  contentGeneration,
} from "../../utils/endpoints/content";
import merge from "lodash/fp/merge";
import { UpdateParams, UpdateContext } from "types/generic";

export const useFetchContent = (id: number) => {
  const {
    data: contentData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["content", id],
    queryFn: async () => {
      const content = await fetchContent(id);
      return content;
    },
    enabled: !!id,
  });

  return { contentData, isLoading, error, refetch };
};

function mergeWithComponentOverride(oldData, payload) {
  // directly override components
  const newData = {
    ...oldData,
    components: payload.components ? payload.components : oldData.components,
  };
  // merge the rest of the payload with the new data
  return merge(newData, payload);
}

export const useUpdateContent = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, error, isSuccess } = useMutation<
    ReturnType<typeof updateContent>,
    Error,
    UpdateParams,
    UpdateContext
  >(
    async ({ id, payload }) => {
      if (!id) throw Error("No ID provided");
      return updateContent(id, payload);
    },
    {
      // optimisitcally update the UI with new data and rollback if there is an error
      onMutate: async ({ id, payload }) => {
        await queryClient.cancelQueries(["content", id]);
        const previous = queryClient.getQueryData(["content", id]);

        queryClient.setQueryData(["content", id], (oldData: any) => {
          // this will do a deep merge of the old data and the new data so we can omit fields in content_params (for example) and they will still be there
          // components is a special case because we want to directly override the components key
          const mergedData = mergeWithComponentOverride(oldData, payload);
          return mergedData;
        });

        return { previous };
      },
      onSuccess: async (_, { id, invalidateCache = false }) => {
        if (invalidateCache) {
          await queryClient.invalidateQueries(["content", id]);
        }
      },
      onError: (error, { id }, context) => {
        queryClient.setQueryData(["content", id], context?.previous);
        console.error("API error:", error);
        return error;
      },
    }
  );

  return {
    updateContent: mutateAsync,
    isLoading,
    isSuccess,
    error,
  };
};

export const useContentGeneration = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, error, isSuccess } = useMutation<
    ReturnType<typeof updateContent>,
    Error,
    UpdateParams,
    UpdateContext
  >(
    async ({ id, payload }) => {
      return contentGeneration(id, payload);
    },
    {
      onSuccess: (data, { id }) => {
        // merge data into content.results as an array
        queryClient.setQueryData(["content", id], (currentContent: any) => {
          const updatedContent = { ...currentContent };
          updatedContent.results = [data];
          return updatedContent;
        });
        queryClient.invalidateQueries({ queryKey: ["content", id] });

        return data;
      },
      onError: (error, { id }, context) => {
        queryClient.setQueryData(["content", id], context?.previous);
        console.error("API error:", error);
        return error;
      },
    }
  );

  return {
    generateContent: mutateAsync,
    isLoading,
    isSuccess,
    error,
  };
};
