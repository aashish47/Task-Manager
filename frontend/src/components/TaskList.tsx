import { Box, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useTasksContext from "../hooks/useTasksContext";
import Task from "./Task";
import AddTaskButton from "./AddTaskButton";
import EnterTaskTitle from "./EnterTaskTitle";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import { Draggable } from "react-beautiful-dnd";
import useUpdateListMutation from "../hooks/useUpdateListMutation";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import ListActions from "./ListActions";
import { ListType } from "../types/listTypes";
import { TaskType } from "../types/taskTypes";

type TaskListProps = {
    index: number;
    list: ListType;
    boardId: string;
};

const TaskList: React.FC<TaskListProps> = ({ index, boardId, list }) => {
    const { _id: listId, tasksIds, name, workspaceId } = list;
    const theme = useTheme();
    const mode = theme.palette.mode;
    const data = useTasksContext(boardId);
    const updateListMutation = useUpdateListMutation();
    const [editLName, setEditLName] = useState(false);
    const [inputLName, setInputLName] = useState(name);
    const unOrderedTasks = data ? data.filter((task) => task.listId === listId) : null;
    let taskLookup: Map<string, TaskType> | null = null;
    if (unOrderedTasks) {
        taskLookup = new Map();
        unOrderedTasks.forEach((task) => taskLookup?.set(task._id, task));
    }

    const tasks = tasksIds.map((taskId) => taskLookup?.get(taskId));
    console.log(tasks);

    const [first, setFirst] = React.useState(true);
    const maxHeight = first ? "calc(100vh - 240px)" : "calc(100vh - 210px)";
    const containerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!first && containerRef.current) {
            const container = containerRef.current;
            const scrollHeight = container.scrollHeight;
            const scrollTop = container.scrollTop;
            const distance = scrollHeight - scrollTop;
            const startTime = performance.now();
            const duration = 1000; // Adjust the duration as per your preference (in milliseconds)

            const animateScroll = (timestamp: number) => {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = easeOutCubic(progress);
                container.scrollTo(0, scrollTop + distance * ease);

                if (elapsed < duration) {
                    requestAnimationFrame(animateScroll);
                }
            };

            requestAnimationFrame(animateScroll);
        }
    }, [first]);

    // Easing function for smoother animation
    const easeOutCubic = (t: number) => {
        return 1 - Math.pow(1 - t, 3);
    };

    useEffect(() => {
        if (!first && tasks && tasks.length > 0 && containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [first, tasks]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleClickAway();
        }
    };

    const handleClickAway = async () => {
        setEditLName(false);
        if (list && inputLName) {
            const newList = { ...list, name: inputLName };
            await updateListMutation.mutateAsync({ boardId, listId, newList });
        }
    };

    return (
        <Draggable draggableId={listId} index={index}>
            {(provided) => (
                <Box
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    sx={{
                        flexBasis: "300px",
                        height: "fit-content",
                        flexShrink: "0",
                        p: 1,
                        borderRadius: 2,
                        bgcolor: mode === "dark" ? "#100901" : "#ededed",
                    }}
                >
                    <Stack direction="row" gap={1} alignItems="center" justifyContent="space-between">
                        {!editLName ? (
                            <Typography
                                sx={{
                                    lineHeight: 1.5,
                                    wordBreak: "break-all",
                                    "&:hover": { cursor: "pointer" },
                                    width: "100%",
                                    p: "8.5px 14px",
                                    flexWrap: "wrap",
                                }}
                                onClick={() => setEditLName(true)}
                                {...provided.dragHandleProps}
                                variant="subtitle1"
                                component={"div"}
                            >
                                {inputLName}
                            </Typography>
                        ) : (
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <TextField
                                    sx={{ justifyContent: "center", bgcolor: mode === "dark" ? "#22272b" : "white" }}
                                    multiline
                                    onFocus={(e) => e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)}
                                    size="small"
                                    fullWidth
                                    inputProps={{ style: { lineHeight: 1.5, fontWeight: 400, fontSize: "1rem" } }}
                                    onKeyDown={handleKeyDown}
                                    value={inputLName}
                                    onChange={(e) => setInputLName(e.target.value)}
                                    autoFocus
                                    focused
                                    variant="outlined"
                                />
                            </ClickAwayListener>
                        )}
                        <ListActions boardId={boardId} listId={listId} />
                    </Stack>
                    <Box ref={containerRef} id="container" sx={{ overflowY: "auto", overflowX: "hidden", maxHeight }}>
                        <Droppable type="tasks" droppableId={listId}>
                            {(provided) => (
                                <div style={{ minHeight: "1px" }} {...provided.droppableProps} ref={provided.innerRef}>
                                    {tasks && tasks.map((task, index) => task && <Task key={task._id} boardId={boardId} task={task} index={index} />)}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <Box sx={{ flexBasis: "300px", flexShrink: "0", mt: 2 }}>
                            <EnterTaskTitle workspaceId={workspaceId} boardId={boardId} first={first} setFirst={setFirst} listId={listId} />
                        </Box>
                    </Box>

                    <Box sx={{ mt: 1, pr: 3 }}>
                        <AddTaskButton first={first} setFirst={setFirst} />
                    </Box>
                </Box>
            )}
        </Draggable>
    );
};

export default TaskList;
