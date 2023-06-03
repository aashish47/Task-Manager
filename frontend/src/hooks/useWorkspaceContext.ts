import { useQueryClient } from "@tanstack/react-query";

const useWorkspaceContext = () => {
    const queryClient = useQueryClient();
    const workspaceData = queryClient.getQueryData(["workspaces"]) as Array<{
        createdAt: string;
        createdBy: string;
        description: string;
        name: string;
        updatedAt: string;
        __v: number;
        _id: string;
    }>;

    return workspaceData;
};

export default useWorkspaceContext;
