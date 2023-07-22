import { Stack, Typography } from "@mui/material";
import useWorkspacesContext from "../../hooks/workspace/useWorkspaceContext";
import WorkspaceAvater from "../workspace/WorkspaceAvatar";
import WorkspaceBoards from "../workspace/WorkspaceBoards";

const AllBoards = () => {
    const workspaces = useWorkspacesContext();

    return (
        <Stack spacing={4} sx={{ mx: { xs: 1, md: 0 }, width: "100%", maxWidth: { xs: 500, lg: 800 } }}>
            <Typography variant="h6">Your Workspaces</Typography>
            {workspaces &&
                workspaces.map((workspace) => {
                    const { _id, name } = workspace;
                    return (
                        <Stack key={_id} spacing={1}>
                            <Stack alignItems="center" direction="row" spacing={1}>
                                <WorkspaceAvater
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

export default AllBoards;
