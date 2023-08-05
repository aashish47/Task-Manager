import { Divider, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useUpdateWorkspaceMutation from "../../hooks/workspace/useUpdateWorkspaceMutation";
import useWorkspacesContext from "../../hooks/workspace/useWorkspaceContext";
import WorkspaceMembersList from "./WorkspaceMembersList";

const WorkspaceGuests = () => {
    const { wid: workspaceId } = useParams();

    const workspaces = useWorkspacesContext();
    const updateWorkspaceMutation = useUpdateWorkspaceMutation();
    const workspace = workspaces?.find((workspace) => workspace._id === workspaceId);
    const guests = workspace?.guests;

    const handleClick = async (guest: string) => {
        if (!guests || !workspace || !workspaceId) {
            return;
        }
        const index = guests.indexOf(guest);
        if (index !== -1) {
            guests.splice(index, 1);
            workspace.members.push(guest);
            await updateWorkspaceMutation.mutateAsync({ workspaceId, newWorkspace: workspace });
        }
    };

    return (
        <Stack gap={2}>
            <Typography variant="h6">Guests</Typography>
            <Typography variant="body2">Guests can only view and edit the boards to which they've been added.</Typography>
            <Divider />
            {guests && guests.length > 0 ? (
                guests.map((guest) => <WorkspaceMembersList key={guest} member={guest} button={"upgrade"} onClick={() => handleClick(guest)} />)
            ) : (
                <Typography variant="caption">There are no guests in this workspace.</Typography>
            )}
        </Stack>
    );
};

export default WorkspaceGuests;
