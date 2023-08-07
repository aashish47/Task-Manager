import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoard } from "../../api/api";
import { BoardType } from "../../types/boardTypes";
import useSocketContext from "../context/useSocketContext";

const useUpdateBoardMutation = () => {
    const queryClient = useQueryClient();
    const socket = useSocketContext();
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
        onSettled: (_data, error, variables, context) => {
            const { boardId } = variables;
            if (error) {
                console.log(error);
                queryClient.setQueryData(["Boards"], context?.previousBoardData);
            }
            socket?.emit("invalidateBoards", boardId);
        },
    });
};

export default useUpdateBoardMutation;
