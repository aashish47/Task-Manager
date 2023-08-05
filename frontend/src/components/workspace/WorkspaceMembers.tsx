import { Divider, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useBoardsContext from "../../hooks/board/useBoardsContext";
import useUpdateWorkspaceMutation from "../../hooks/workspace/useUpdateWorkspaceMutation";
import useWorkspacesContext from "../../hooks/workspace/useWorkspaceContext";
import WorkspaceInvite from "./WorkspaceInvite";
import WorkspaceMembersList from "./WorkspaceMembersList";

const WorkspaceMembers = () => {
    const { wid: workspaceId } = useParams();
    const workspaces = useWorkspacesContext();
    const boards = useBoardsContext();
    const workspaceBoards = boards?.filter((board) => board.workspaceId === workspaceId);
    const updateWorkspaceMutation = useUpdateWorkspaceMutation();
    const workspace = workspaces?.find((workspace) => workspace._id === workspaceId);
    const members = workspace?.members;

    const handleClick = async (member: string) => {
        if (!workspace || !workspaceId || !members) {
            return;
        }
        const index = members.indexOf(member);
        if (index !== -1) {
            members.splice(index, 1);
            if (workspaceBoards) {
                for (let i = 0; i < workspaceBoards.length; i++) {
                    if (workspaceBoards[i].members.includes(member)) {
                        workspace.guests.push(member);
                        break;
                    }
                }
            }

            await updateWorkspaceMutation.mutateAsync({ workspaceId, newWorkspace: workspace });
        }
    };

    return (
        <Stack gap={2}>
            <Typography variant="h6">Workspace members</Typography>
            <Typography variant="body2">Workspace members can view and join all Workspace visible boards and create new boards in the Workspace.</Typography>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">Invite members to join you</Typography>
                <WorkspaceInvite />
            </Stack>
            <Divider />

            {members && members.map((member) => <WorkspaceMembersList key={member} member={member} button="remove" onClick={() => handleClick(member)} />)}
        </Stack>
    );
};

export default WorkspaceMembers;
