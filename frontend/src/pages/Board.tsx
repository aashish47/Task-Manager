import { useParams } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Stack } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import CreateList from "../components/CreateList";
import useListsContext from "../hooks/useListsContext";
import TaskList from "../components/TaskList";
import useMoveTaskMutation from "../hooks/useMoveTaskMutation";
import useUpdateListMutation from "../hooks/useUpdateListMutation";
import { onDragEnd } from "../helpers/dragHelpers";
import Main from "../components/Main";
import { StrictModeDroppable as Droppable } from "../components/StrictModeDroppable";
import useUpdateBoardMutation from "../hooks/useUpdateBoardMutation";
import useBoardsContext from "../hooks/useBoardsContext";
import useAuthContext from "../hooks/useAuthContext";
import { ListType } from "../types/listTypes";
import useWorkspacesContext from "../hooks/useWorkspaceContext";
import BoardDrawer from "../components/BoardDrawer";
import BoardAppBar from "../components/BoardAppBar";

const Board = () => {
    const { bid: boardId = "" } = useParams();
    const user = useAuthContext();
    const boardData = useBoardsContext();
    const workspaceData = useWorkspacesContext();
    const [open, setOpen] = useState(false);
    const unOrderedLists: ListType[] | undefined = useListsContext(boardId);
    const moveTaskMutation = useMoveTaskMutation();
    const updateListMutation = useUpdateListMutation();
    const updateBoardMutation = useUpdateBoardMutation();

    const board = boardData ? boardData.find((board) => board._id === boardId) : null;
    const { listsIds, workspaceId } = board || {};
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
        <Box sx={{ display: "flex", mt: 0.1 }}>
            <CssBaseline />
            <BoardDrawer open={open} setOpen={setOpen} workspace={workspace} />
            <Stack sx={{ width: "100%" }}>
                <BoardAppBar open={open} setOpen={setOpen} board={board} />

                <DragDropContext onDragEnd={(result) => onDragEnd(result, moveTaskMutation, updateListMutation, updateBoardMutation, lists, board)}>
                    <Droppable droppableId={boardId} direction="horizontal" type="lists">
                        {(provided) => (
                            <Main ref={provided.innerRef} {...provided.droppableProps} open={open}>
                                <Stack direction="row" spacing={1} sx={{ overflowX: "auto", overflowY: "hidden", height: "calc(100vh - 110px)" }}>
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
