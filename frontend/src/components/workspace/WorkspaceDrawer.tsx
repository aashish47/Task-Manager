import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { drawerWidth, navbarHeight } from "../../constants/constants";
import useBoardsContext from "../../hooks/board/useBoardsContext";
import useAuthContext from "../../hooks/context/useAuthContext";
import useGetWorkspaceById from "../../hooks/workspace/useGetWorkspaceById";
import { BoardType } from "../../types/boardTypes";
import DrawerHeader from "../common/DrawerHeader";
import WorkspaceAvatar from "./WorkspaceAvatar";

type WorkspaceDrawerProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const WorkspaceDrawer: React.FC<WorkspaceDrawerProps> = ({ open, setOpen }) => {
    const user = useAuthContext();
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleBoardListClick = (name: string, _id: string) => {
        navigate(`/b/${name}/${_id}`);
    };
    const handleBoardsClick = () => {
        navigate(`/w/${workspaceName}/${workspaceId}`);
    };
    const handleMembersClick = () => {
        navigate(`/w/${workspaceName}/${workspaceId}/members`);
    };
    const handleSettingsClick = () => {
        navigate(`/w/${workspaceName}/${workspaceId}/settings`);
    };

    const listItems = ["Boards", "Members", "Workspace Settings"];
    const listIcons = [<DashboardIcon />, <GroupsIcon />, <SettingsIcon />];
    const listItemsButtonClick = [handleBoardsClick, handleMembersClick, handleSettingsClick];

    const theme = useTheme();
    const mode = theme.palette.mode;
    const navigate = useNavigate();
    const boardsData = useBoardsContext();

    const { bid = "", wid } = useParams();

    let workspaceId: string, board: BoardType[] | undefined;
    if (wid) {
        workspaceId = wid;
    } else {
        board = boardsData?.filter((board) => board._id === bid);
        workspaceId = board ? board[0].workspaceId : "";
    }

    const workspace = useGetWorkspaceById(workspaceId);
    const workspaceName = workspace?.name;
    const isWorkspaceMember = user && workspace && workspace.members.includes(user.uid);
    let workspaceBoards: BoardType[] | BoardType | undefined;
    if (isWorkspaceMember) {
        workspaceBoards = boardsData?.filter((board) => board.workspaceId === workspaceId);
    } else {
        workspaceBoards = board;
    }

    return (
        <Drawer
            sx={{
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
                    height: `calc(100% - ${navbarHeight}px)`,
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader sx={{ justifyContent: "space-between", minHeight: "49px!important" }}>
                <Stack ml={1} gap={1} alignItems="center" direction="row">
                    {workspaceName && <WorkspaceAvatar wname={workspaceName} size={{ width: 30, height: 30 }} />}
                    <Typography variant="subtitle1">{workspaceName}</Typography>
                </Stack>
                <IconButton color="inherit" onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            {isWorkspaceMember && (
                <List>
                    <ListItem key={listItems[0]} disablePadding>
                        <ListItemButton onClick={listItemsButtonClick[0]}>
                            <ListItemIcon>{listIcons[0]}</ListItemIcon>
                            <ListItemText secondary={listItems[0]} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={listItems[1]} disablePadding>
                        <ListItemButton onClick={listItemsButtonClick[1]}>
                            <ListItemIcon>{listIcons[1]}</ListItemIcon>
                            <ListItemText secondary={listItems[1]} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={listItems[2]} disablePadding>
                        <ListItemButton onClick={listItemsButtonClick[2]}>
                            <ListItemIcon>{listIcons[2]}</ListItemIcon>
                            <ListItemText secondary={listItems[2]} />
                        </ListItemButton>
                    </ListItem>
                </List>
            )}
            <Divider />
            <Typography variant="subtitle1" p={2} pb={1}>
                Your Boards
            </Typography>
            <List>
                {workspaceBoards &&
                    workspaceBoards.map((board) => {
                        const { _id, name, coverUrls } = board;
                        const { thumb } = coverUrls;
                        return (
                            <ListItem key={_id} disablePadding>
                                <ListItemButton onClick={() => handleBoardListClick(name, _id)}>
                                    <ListItemIcon>
                                        <Avatar sx={{ width: 24, height: 24 }} variant="square" src={thumb} />
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

export default WorkspaceDrawer;
