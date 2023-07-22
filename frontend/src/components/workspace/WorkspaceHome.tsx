import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Divider, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useWorkspacesContext from "../../hooks/workspace/useWorkspaceContext";
import WorkspaceBoards from "./WorkspaceBoards";
import WorkspaceDetailsBar from "./WorkspaceDetailsBar";

const WorkspaceHome = () => {
    const { wname = "", wid = "" } = useParams<{ wname: string; wid: string }>();
    const workpaces = useWorkspacesContext();
    const workspace = workpaces?.find((w) => w._id === wid);
    const description = workspace?.description ?? "";
    return (
        <Stack sx={{ mx: { xs: 1, md: 0 }, width: "100%", maxWidth: { xs: 500, lg: 800 } }}>
            <WorkspaceDetailsBar wname={wname} description={description} />
            <Divider sx={{ my: 2 }} />
            <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <PersonOutlineIcon fontSize="large" />
                    <Typography variant="h6">Your Boards</Typography>
                </Stack>
                <WorkspaceBoards workspaceId={wid} />
            </Stack>
        </Stack>
    );
};

export default WorkspaceHome;
