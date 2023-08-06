import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GroupsIcon from "@mui/icons-material/Groups";
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { drawerWidth } from "../../constants/constants";
import { BoardType } from "../../types/boardTypes";
import DrawerHeader from "../common/DrawerHeader";
import BoardChangeBackground from "./BoardChangeBackground";
import BoardDelete from "./BoardDelete";

type BoardRightDrawerProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    board: BoardType;
};

const BoardRightDrawer: React.FC<BoardRightDrawerProps> = ({ open, setOpen, board }) => {
    const { _id: boardId, members, name } = board;
    const listItems = ["About this board", "Change background", `Members (${members.length})`, "Delete this board"];
    const listIcons = [<DashboardIcon />, <FavoriteBorderIcon />, <GroupsIcon />, <DeleteIcon />];
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
                <IconButton color="inherit" onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>

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
                <BoardDelete boardId={boardId} name={name} />
            </List>
        </Drawer>
    );
};

export default BoardRightDrawer;
