import { useQueryClient } from "@tanstack/react-query";

const useBoardsContext = () => {
    const queryClient = useQueryClient();
    const BoardsData = queryClient.getQueryData(["Boards"]) as Array<{
        createdAt: string;
        createdBy: string;
        workspaceId: string;
        name: string;
        updatedAt: string;
        __v: number;
        _id: string;
    }>;

    return BoardsData;
};

export default useBoardsContext;
