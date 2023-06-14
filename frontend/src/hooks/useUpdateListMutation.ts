import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateList } from "../api/api";
import { ListType } from "./useListsContext";

const useUpdateListMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateList,
        // When mutate is called:
        onMutate: async ({ listId, newList }) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(["Lists"]);

            // Snapshot the previous value
            const previousListData = queryClient.getQueryData(["Lists"]) as ListType[];

            // Optimistically update to the new value

            const newListData: ListType[] = queryClient.setQueryData(["Lists"], (old: any) =>
                old.map((list: ListType) => {
                    if (list._id === listId) {
                        return newList;
                    }
                    return list;
                })
            );

            // Return a context with the previous and new todo
            return { previousListData, newListData };
        },
        // If the mutation fails, use the context we returned above
        // Always refetch after error or success:
        onSettled: (data, error, variables, context) => {
            if (error) {
                console.log(error);
                queryClient.setQueryData(["Lists"], context?.previousListData);
            }

            queryClient.invalidateQueries(["Lists"]);
        },
    });
};

export default useUpdateListMutation;
