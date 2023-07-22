import { Stack, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import BoardAppBar from "../components/board/BoardAppBar";
import BoardRightDrawer from "../components/board/BoardRightDrawer";
import Main from "../components/board/Main";
import { StrictModeDroppable as Droppable } from "../components/common/StrictModeDroppable";
import CreateList from "../components/list/CreateList";
import TaskList from "../components/task/TaskList";
import BoardLeftDrawer from "../components/workspace/BoardLeftDrawer";
import { onDragEnd } from "../helpers/dragHelpers";
import useBoardsContext from "../hooks/board/useBoardsContext";
import useUpdateBoardMutation from "../hooks/board/useUpdateBoardMutation";
import useAuthContext from "../hooks/context/useAuthContext";
import useListsContext from "../hooks/list/useListsContext";
import useUpdateListMutation from "../hooks/list/useUpdateListMutation";
import useMoveTaskMutation from "../hooks/task/useMoveTaskMutation";
import useWorkspacesContext from "../hooks/workspace/useWorkspaceContext";
import { ListType } from "../types/listTypes";

const background = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    mixBlendMode: "multiply",
};

const Board = () => {
    const { bid: boardId = "" } = useParams();
    const theme = useTheme();
    const mode = theme.palette.mode;
    const user = useAuthContext();
    const boardData = useBoardsContext();
    const workspaceData = useWorkspacesContext();
    const [openLeftDrawer, setOpenLeftDrawer] = useState(false);
    const [openRightDrawer, setOpenRightDrawer] = useState(false);
    const unOrderedLists: ListType[] | undefined = useListsContext(boardId);
    const moveTaskMutation = useMoveTaskMutation();
    const updateListMutation = useUpdateListMutation();
    const updateBoardMutation = useUpdateBoardMutation();

    const board = boardData ? boardData.find((board) => board._id === boardId) : null;
    const { listsIds, workspaceId, cover = "" } = board || {};
    let workspace = workspaceData ? workspaceData.find((workspace) => workspace._id === workspaceId) : null;
    if (!workspace) {
        workspace = {
            createdAt: "",
            createdBy: "",
            description: "",
            name: "",
            updatedAt: "",
            __v: 0,
            _id: "",
        };
    }

    let listLookup: Map<string, ListType> | null = null;
    if (unOrderedLists) {
        listLookup = new Map();
        unOrderedLists.forEach((list) => listLookup?.set(list._id, list));
    }

    const lists = listsIds?.map((listId) => listLookup?.get(listId));

    return board && user && board.members.includes(user.uid) ? (
        <Box sx={{ position: "relative", backgroundImage: `url(${cover})`, backgroundSize: "cover", backgroundPosition: "center", display: "flex" }}>
            {mode === "dark" && <Box sx={background} />}
            <CssBaseline />
            <BoardLeftDrawer open={openLeftDrawer} setOpen={setOpenLeftDrawer} workspace={workspace} />

            <Stack sx={{ zIndex: 1, width: "100%" }}>
                <BoardAppBar
                    openLeftDrawer={openLeftDrawer}
                    setOpenLeftDrawer={setOpenLeftDrawer}
                    openRightDrawer={openRightDrawer}
                    setOpenRightDrawer={setOpenRightDrawer}
                    board={board}
                />

                <DragDropContext onDragEnd={(result) => onDragEnd(result, moveTaskMutation, updateListMutation, updateBoardMutation, lists, board)}>
                    <Droppable droppableId={boardId} direction="horizontal" type="lists">
                        {(provided) => (
                            <Main ref={provided.innerRef} {...provided.droppableProps} left={openLeftDrawer} right={openRightDrawer}>
                                <Stack direction="row" spacing={1} sx={{ overflowX: "auto", overflowY: "hidden", height: "calc(100vh - 106px)" }}>
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
            <BoardRightDrawer open={openRightDrawer} setOpen={setOpenRightDrawer} board={board} />
        </Box>
    ) : (
        <div>Not a Member</div>
    );
};
export default Board;
