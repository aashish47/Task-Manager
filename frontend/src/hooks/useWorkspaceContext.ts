import { useQuery } from "@tanstack/react-query";
import { fetchWorkspaces } from "../api/api";

const useWorkspacesContext = () => {
    const { data: workspaces } = useQuery<
        Array<{
            createdAt: string;
            createdBy: string;
            description: string;
            name: string;
            updatedAt: string;
            __v: number;
            _id: string;
        }>
    >(
        ["Workspaces"],
        () => fetchWorkspaces() // Replace with your actual data fetching function
    );

    return workspaces;
};

export default useWorkspacesContext;
