import { Stack, Typography } from "@mui/material";
import AvatarWorkspace from "./AvatarWorkspace";
import WorkspaceBoards from "./WorkspaceBoards";
import useWorkspacesContext from "../hooks/useWorkspaceContext";

const BoardsUsers = () => {
    const workspaces = useWorkspacesContext();

    return (
        <Stack spacing={4} sx={{ mx: { xs: 1, md: 0 }, width: "100%", maxWidth: { xs: 500, lg: 800 } }}>
            <Typography variant="h6">Your Workspaces</Typography>
            {workspaces &&
                workspaces.map((workspace) => {
                    const { _id, name } = workspace;
                    return (
                        <Stack spacing={1}>
                            <Stack alignItems="center" direction="row" spacing={1}>
                                <AvatarWorkspace
                                    wname={name}
                                    size={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                                <Typography variant="subtitle1">{name}</Typography>
                            </Stack>
                            <WorkspaceBoards workspaceId={_id} />
                        </Stack>
                    );
                })}
        </Stack>
    );
};

export default BoardsUsers;
