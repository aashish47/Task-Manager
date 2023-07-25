import { Divider, Stack, Typography } from "@mui/material";

const WorkspaceRequests = () => {
    return (
        <Stack gap={2}>
            <Typography variant="h6">Pending</Typography>
            <Typography variant="body2">
                These people have requested to join this Workspace. All Workspace members are admins and can edit Workspace settings.
            </Typography>
            <Divider />
        </Stack>
    );
};

export default WorkspaceRequests;
