import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoard } from "../api/api";
import { BoardType } from "./useBoardsContext";

const useUpdateBoardMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateBoard,
        onMutate: async ({ boardId, newBoard }) => {
            await queryClient.cancelQueries(["Boards"]);

            const previousBoardData = queryClient.getQueryData(["Boards"]) as BoardType[];

            const newBoardData: BoardType[] = queryClient.setQueryData(["Boards"], (old: any) =>
                old.map((board: BoardType) => {
                    if (board._id === boardId) {
                        return newBoard;
                    }
                    return board;
                })
            );
            return { previousBoardData, newBoardData };
        },
        onSettled: (data, error, variables, context) => {
            if (error) {
                console.log(error);
                queryClient.setQueryData(["Boards"], context?.previousBoardData);
            }
            queryClient.invalidateQueries(["Boards"]);
        },
    });
};

export default useUpdateBoardMutation;
