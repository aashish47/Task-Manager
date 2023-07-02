import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Button, List, Stack, TextField } from "@mui/material";
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
import { StrictModeDroppable as Droppable } from "../components/StrictModeDroppable";
import useUpdateBoardMutation from "../hooks/useUpdateBoardMutation";
import useBoardsContext from "../hooks/useBoardsContext";
import InviteDialog from "../components/InviteDialog";
import useAuthContext from "../hooks/useAuthContext";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import BoardActions from "../components/BoardActions";
import { ListType } from "../types/listTypes";

const Board = () => {
    const { bid: boardId = "" } = useParams();
    const user = useAuthContext();
    const theme = useTheme();
    const mode = theme.palette.mode;
    const boardData = useBoardsContext();
    const [open, setOpen] = useState(false);
    const [openInvite, setOpenInvite] = useState(false);
    const [editBName, setEditBName] = useState(false);

    const unOrderedLists: ListType[] | undefined = useListsContext(boardId);

    const moveTaskMutation = useMoveTaskMutation();
    const updateListMutation = useUpdateListMutation();
    const updateBoardMutation = useUpdateBoardMutation();

    const board = boardData ? boardData.find((board) => board._id === boardId) : null;

    const { name: boardName, listsIds, workspaceId } = board || {};

    const [inputBName, setInputBName] = useState(boardName);

    let listLookup: Map<string, ListType> | null = null;
    if (unOrderedLists) {
        listLookup = new Map();
        unOrderedLists.forEach((list) => listLookup?.set(list._id, list));
    }

    const lists = listsIds?.map((listId) => listLookup?.get(listId));

    useEffect(() => {
        setInputBName(boardName);
    }, [boardName]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleClickAway();
        }
    };

    const handleClickAway = async () => {
        setEditBName(false);
        if (board && inputBName) {
            const newBoard = { ...board, name: inputBName };
            await updateBoardMutation.mutateAsync({ boardId, newBoard });
        }
    };

    return board && user && board.members.includes(user.uid) ? (
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
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
                            {!editBName ? (
                                <Typography
                                    sx={{ "&:hover": { cursor: "pointer" }, p: "8.5px 14px" }}
                                    onClick={() => setEditBName(true)}
                                    variant="h6"
                                    noWrap
                                    component="div"
                                >
                                    {inputBName}
                                </Typography>
                            ) : (
                                <ClickAwayListener onClickAway={handleClickAway}>
                                    <TextField
                                        sx={{ bgcolor: mode === "dark" ? "#22272b" : "#feff0026" }}
                                        onFocus={(e) => e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)}
                                        size="small"
                                        inputProps={{ style: { fontWeight: 500, fontSize: "1.25rem" } }}
                                        onKeyDown={handleKeyDown}
                                        value={inputBName}
                                        onChange={(e) => setInputBName(e.target.value)}
                                        autoFocus
                                        focused
                                        variant="outlined"
                                    />
                                </ClickAwayListener>
                            )}
                            <Stack direction="row" gap={1}>
                                <Button onClick={() => setOpenInvite(!openInvite)} color="secondary" variant="contained" startIcon={<PersonAddAltIcon />}>
                                    Invite
                                </Button>
                                <InviteDialog boardId={boardId} open={openInvite} setOpen={setOpenInvite} />

                                <BoardActions boardId={boardId} />
                            </Stack>
                        </Stack>
                    </Toolbar>
                    <Divider />
                </AppBar>

                <DragDropContext onDragEnd={(result) => onDragEnd(result, moveTaskMutation, updateListMutation, updateBoardMutation, lists, board)}>
                    <Droppable droppableId={boardId} direction="horizontal" type="lists">
                        {(provided) => (
                            <Main ref={provided.innerRef} {...provided.droppableProps} open={open}>
                                <Stack direction="row" spacing={1} sx={{ overflowX: "auto", overflowY: "hidden", height: "calc(100vh - 140px)" }}>
                                    {lists &&
                                        lists.map((list, index) => {
                                            return list && <TaskList key={list._id} index={index} list={list} boardId={boardId} />;
                                        })}
                                    {provided.placeholder}
                                    {workspaceId && <CreateList workspaceId={workspaceId} boardId={boardId} />}{" "}
                                </Stack>
                            </Main>
                        )}
                    </Droppable>
                </DragDropContext>
            </Stack>
        </Box>
    ) : (
        <div>Not a Member</div>
    );
};
export default Board;
