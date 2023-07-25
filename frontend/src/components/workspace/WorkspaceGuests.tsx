import { Divider, Stack, Typography } from "@mui/material";

const WorkspaceGuests = () => {
    return (
        <Stack gap={2}>
            <Typography variant="h6">Guests</Typography>
            <Typography variant="body2">Guests can only view and edit the boards to which they've been added.</Typography>
            <Divider />
        </Stack>
    );
};

export default WorkspaceGuests;
