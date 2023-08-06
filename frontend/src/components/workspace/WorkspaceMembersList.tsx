import { Avatar, Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { teal } from "@mui/material/colors";
import useGetUserByUid from "../../hooks/user/useGetUserByUid";

type WorkspaceMembersListProps = {
    member: string;
    button: string;
    onClick: () => void;
};

const WorkspaceMembersList: React.FC<WorkspaceMembersListProps> = ({ member, button, onClick }) => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const user = useGetUserByUid(member);

    return (
        user && (
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Avatar variant="rounded" sx={{ bgcolor: mode === "dark" ? teal[200] : teal[700], width: "30px", height: "30px" }}>
                    {user.name.charAt(0)}
                </Avatar>
                <Typography ml={1}>{user.name}</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button onClick={onClick} size="small" variant="outlined" color="inherit">
                    {button}
                </Button>
            </Stack>
        )
    );
};

export default WorkspaceMembersList;
