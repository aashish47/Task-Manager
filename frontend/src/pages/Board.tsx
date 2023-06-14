import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { List, Stack } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import CreateList from "../components/CreateList";
import useListsContext from "../hooks/useListsContext";
import TaskList from "../components/TaskList";
import useMoveTaskMutation from "../hooks/useMoveTaskMutation";
import useUpdateListMutation from "../hooks/useUpdateListMutation";
import { onDragEnd } from "../utils/dragUtils";
import Main from "../components/Main";
import { drawerWidth } from "../constants/constants";
import DrawerHeader from "../components/DrawerHeader";
import AppBar from "../components/AppBar";

const Board = () => {
    const { bname: boardName = "", bid: boardId = "" } = useParams();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const data = useListsContext();
    const lists = data ? data.filter((list) => list.boardId === boardId) : null;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const moveTaskMutation = useMoveTaskMutation();
    const updateListMutation = useUpdateListMutation();

    return (
        <Box sx={{ display: "flex", mt: 0.1 }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        top: "auto",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List sx={{ mb: 10 }}>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Stack sx={{ width: "100%" }}>
                <AppBar position="static" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: "none" }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            {boardName}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DragDropContext onDragEnd={(result) => onDragEnd(result, moveTaskMutation, updateListMutation, lists)}>
                    <Main open={open}>
                        <Stack direction="row" spacing={1} sx={{ overflowX: "auto", overflowY: "hidden", height: "calc(100vh - 140px)" }}>
                            {lists &&
                                lists.map((list) => {
                                    return <TaskList key={list._id} tasksIds={list.tasksIds} name={list.name} listId={list._id} />;
                                })}
                            <CreateList boardId={boardId} />
                        </Stack>
                    </Main>
                </DragDropContext>
            </Stack>
        </Box>
    );
};
export default Board;
