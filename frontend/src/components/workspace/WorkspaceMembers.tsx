import { Divider, Stack, Typography } from "@mui/material";
import WorkspaceInvite from "./WorkspaceInvite";

const WorkspaceMembers = () => {
    return (
        <Stack gap={2}>
            <Typography variant="h6">Workspace members</Typography>
            <Typography variant="body2">Workspace members can view and join all Workspace visible boards and create new boards in the Workspace.</Typography>
            <Divider />
            <Typography variant="h6">Invite members to join you</Typography>
            <WorkspaceInvite />
            <Divider />
        </Stack>
    );
};

export default WorkspaceMembers;
