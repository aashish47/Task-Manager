import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material";
import WorkspaceVisibility from "./WorkspaceVisibility";

const WorkspaceSettings = () => {
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

            <Button sx={{ mt: 5, alignSelf: "flex-start" }} size="small" color="error">
                Delete this workspace
            </Button>
        </Container>
    );
};

export default WorkspaceSettings;
