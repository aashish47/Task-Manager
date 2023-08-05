import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDeleteWorkspaceMutation from "../../hooks/workspace/useDeleteWorkspaceMutation";
import useWorkspacesContext from "../../hooks/workspace/useWorkspaceContext";
import DeleteDialog from "../common/DeleteDialog";
import WorkspaceVisibility from "./WorkspaceVisibility";

const WorkspaceSettings = () => {
    const [open, setOpen] = useState(false);
    const { wid: workspaceId } = useParams();
    const navigate = useNavigate();
    const workspaces = useWorkspacesContext();
    const workspace = workspaces?.find((workspace) => workspace._id === workspaceId);
    const name = workspace?.name;
    const deleteWorkspaceMutaion = useDeleteWorkspaceMutation();

    const handleDelete = async () => {
        try {
            if (workspaceId) {
                await deleteWorkspaceMutaion.mutateAsync({ workspaceId });
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Container>
            <Typography sx={{ mt: 3 }} variant="h6">
                Workspace Settings
            </Typography>

            <Stack mt={3} gap={2}>
                <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                        Workspace Visibility
                    </Typography>
                    <Divider />
                    <Typography my={1} variant="body2">
                        This Workspace is private. It's not indexed or visible to those outside the Workspace.
                    </Typography>
                    <WorkspaceVisibility />
                </Box>

                <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                        Slack workspaces linking
                    </Typography>
                    <Divider />

                    <Typography my={1} variant="body2">
                        Link your Slack and Trello Workspaces together to collaborate on Trello projects from within Slack.
                    </Typography>
                    <Button sx={{ alignItems: "flex-start" }} size="small" color="secondary" variant="outlined">
                        Add to slack
                    </Button>
                </Box>
            </Stack>

            <Button onClick={() => setOpen(true)} sx={{ mt: 5, alignSelf: "flex-start" }} size="small" color="error">
                Delete this workspace
            </Button>
            {name && <DeleteDialog type={"workspace"} name={name} handleDelete={handleDelete} open={open} setOpen={setOpen} />}
        </Container>
    );
};

export default WorkspaceSettings;
