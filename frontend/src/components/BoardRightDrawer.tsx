import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GroupsIcon from "@mui/icons-material/Groups";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Drawer, Typography, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";
import { drawerWidth } from "../constants/constants";
import DrawerHeader from "./DrawerHeader";
import { useTheme } from "@mui/material/styles";
import BoardChangeBackground from "./BoardChangeBackground";
import { BoardType } from "../types/boardTypes";

type BoardRightDrawerProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    board: BoardType;
};

const BoardRightDrawer: React.FC<BoardRightDrawerProps> = ({ open, setOpen, board }) => {
    const listItems = ["About this board", "Change background", "Members", "Workspace Settings"];
    const listIcons = [<DashboardIcon />, <FavoriteBorderIcon />, <GroupsIcon />, <SettingsIcon />];
    const theme = useTheme();

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    overflow: "hidden",
                    top: "48px",
                    height: "calc(100% - 48px)",
                },
            }}
            variant="persistent"
            anchor="right"
            open={open}
        >
            <DrawerHeader sx={{ justifyContent: "space-between", minHeight: "49px!important" }}>
                <IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>

                <Typography variant="subtitle1">Menu</Typography>
                <Box sx={{ width: 40, height: 40 }} />
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem key={listItems[0]} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>{listIcons[0]}</ListItemIcon>
                        <ListItemText secondary={listItems[0]} />
                    </ListItemButton>
                </ListItem>

                <BoardChangeBackground board={board} />

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
        </Drawer>
    );
};

export default BoardRightDrawer;
