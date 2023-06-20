import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateList } from "../api/api";
import { ListType } from "./useListsContext";

const useUpdateListMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateList,
        onMutate: async ({ listId, newList }) => {
            await queryClient.cancelQueries(["Lists"]);
            const previousListData = queryClient.getQueryData(["Lists"]) as ListType[];
            const newListData: ListType[] = queryClient.setQueryData(["Lists"], (old: any) =>
                old.map((list: ListType) => {
                    if (list._id === listId) {
                        return newList;
                    }
                    return list;
                })
            );
            return { previousListData, newListData };
        },
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
