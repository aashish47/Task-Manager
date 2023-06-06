import { useParams } from "react-router-dom";
import WorkspaceBoards from "../components/WorkspaceBoards";
import { Divider, Stack } from "@mui/material";
import WorkspaceDetailsBar from "../components/WorkspaceDetailsBar";
import useWorkspacesContext from "../hooks/useWorkspaceContext";

const WorkspaceHome = () => {
    const { wname = "", id = "" } = useParams<{ wname: string; id: string }>();
    const workpaces = useWorkspacesContext();
    const workspace = workpaces?.find((w) => w._id === id);
    const description = workspace?.description ?? "";
    return (
        <Stack sx={{ width: "100%", maxWidth: { xs: 300, sm: 500, lg: 800 } }}>
            <WorkspaceDetailsBar wname={wname} description={description} />
            <Divider sx={{ my: 2 }} />
            <WorkspaceBoards workspaceId={id} />
        </Stack>
    );
};

export default WorkspaceHome;
