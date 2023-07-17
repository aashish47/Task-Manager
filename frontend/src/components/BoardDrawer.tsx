import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GroupsIcon from "@mui/icons-material/Groups";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Drawer, Stack, Typography, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar } from "@mui/material";
import { drawerWidth } from "../constants/constants";
import DrawerHeader from "./DrawerHeader";
import WorkspaceAvatar from "./WorkspaceAvatar";
import { WorkspaceType } from "../types/workspaceTypes";
import { useTheme } from "@mui/material/styles";
import useBoardsContext from "../hooks/useBoardsContext";
import { useNavigate } from "react-router-dom";

type BoardDrawerProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    workspace: WorkspaceType;
};

const BoardDrawer: React.FC<BoardDrawerProps> = ({ open, setOpen, workspace }) => {
    const listItems = ["Boards", "Highlights", "Members", "Workspace Settings"];
    const listIcons = [<DashboardIcon />, <FavoriteBorderIcon />, <GroupsIcon />, <SettingsIcon />];
    const theme = useTheme();
    const mode = theme.palette.mode;
    const navigate = useNavigate();
    const { _id: workspaceId, name: workspaceName } = workspace;
    const boardsData = useBoardsContext();
    const workspaceBoards = boardsData?.filter((board) => board.workspaceId === workspaceId);
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleBoardListClick = (name: string, _id: string) => {
        navigate(`/b/${name}/${_id}`);
    };
    return (
        <Drawer
            sx={{
                // zIndex: 2,
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiPaper-root": {
                    backgroundColor: mode === "dark" ? "rgb(0 0 0 / 70%)" : "rgb(255 255 255 / 70%)",
                },
                "& .MuiDrawer-paper": {
                    backdropFilter: "blur(16px)",
                    width: drawerWidth,
                    boxSizing: "border-box",
                    top: "auto",
                    height: "calc(100% - 48px)",
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader sx={{ justifyContent: "space-between", minHeight: "49px!important" }}>
                <Stack ml={1} gap={1} alignItems="center" direction="row">
                    <WorkspaceAvatar wname={workspaceName} size={{ width: 30, height: 30 }} />
                    <Typography variant="subtitle1">{workspaceName}</Typography>
                </Stack>
                <IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem key={listItems[0]} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>{listIcons[0]}</ListItemIcon>
                        <ListItemText secondary={listItems[0]} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={listItems[1]} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>{listIcons[1]}</ListItemIcon>
                        <ListItemText secondary={listItems[1]} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={listItems[2]} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>{listIcons[2]}</ListItemIcon>
                        <ListItemText secondary={listItems[2]} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={listItems[3]} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>{listIcons[3]}</ListItemIcon>
                        <ListItemText secondary={listItems[3]} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <Typography variant="subtitle1" p={2} pb={1}>
                Your Boards
            </Typography>
            <List>
                {workspaceBoards &&
                    workspaceBoards.map((board) => {
                        const { _id, name } = board;
                        return (
                            <ListItem key={_id} disablePadding>
                                <ListItemButton onClick={() => handleBoardListClick(name, _id)}>
                                    <ListItemIcon>
                                        <Avatar sx={{ width: 24, height: 24 }} variant="square"></Avatar>
                                    </ListItemIcon>
                                    <ListItemText secondary={name} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
            </List>
        </Drawer>
    );
};

export default BoardDrawer;
