import { Box, List, ListItemButton, ListItemText, ListSubheader, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";

type WorkspaceMembersLayoutProps = {
    children: ReactNode;
};

const WorkspaceMembersLayout: React.FC<WorkspaceMembersLayoutProps> = ({ children }) => {
    const theme = useTheme();
    const isScreenMd = useMediaQuery(theme.breakpoints.down("md"));
    const flexWrap = isScreenMd ? "wrap" : "nowrap";
    const { wid, wname } = useParams();
    const navigate = useNavigate();
    const handleMembersClick = () => {
        navigate(`/w/${wname}/${wid}/members`);
    };
    const handleGuestsClick = () => {
        navigate(`/w/${wname}/${wid}/members/guests`);
    };
    const handlePendingClick = () => {
        navigate(`/w/${wname}/${wid}/members/requests`);
    };

    return (
        <Stack justifyContent="center" gap={2} direction="row" mt={3} flexWrap={flexWrap}>
            <Box flexShrink={0}>
                <Typography variant="h6">Members</Typography>
                <List dense subheader={<ListSubheader sx={{ mt: 1, lineHeight: 2 }}>Members of workspace boards</ListSubheader>}>
                    <ListItemButton onClick={handleMembersClick}>
                        <ListItemText>Workspace members</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={handleGuestsClick}>
                        <ListItemText>Guests</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={handlePendingClick}>
                        <ListItemText>Pending</ListItemText>
                    </ListItemButton>
                </List>
            </Box>
            <Box flexGrow={1} sx={{ minWidth: "250px" }}>
                {children}
            </Box>
        </Stack>
    );
};

export default WorkspaceMembersLayout;
