import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import WorkspaceBoards from "./WorkspaceBoards";

const WorkspaceBoardsWithHeading = () => {
    const { wid = "" } = useParams();
    return (
        <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <PersonOutlineIcon fontSize="large" />
                <Typography variant="h6">Your Boards</Typography>
            </Stack>
            <WorkspaceBoards workspaceId={wid} />
        </Stack>
    );
};

export default WorkspaceBoardsWithHeading;
