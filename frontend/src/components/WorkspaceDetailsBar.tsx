import { Box, Stack, Typography } from "@mui/material";
import WorkspaceAvatar from "./WorkspaceAvatar";

type WorkspaceDetailsBarProps = {
    wname: string;
    description: string;
};

const WorkspaceDetailsBar: React.FC<WorkspaceDetailsBarProps> = ({ wname, description }) => {
    return (
        <>
            <Stack direction="row">
                <Box sx={{ mr: 2, mb: 1 }}>
                    <WorkspaceAvatar wname={wname} size={{ width: 56, height: 56 }} />
                </Box>
                <Typography variant="h6">{wname}</Typography>
            </Stack>
            <Typography variant="caption">{description}</Typography>
        </>
    );
};

export default WorkspaceDetailsBar;
