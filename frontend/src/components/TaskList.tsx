import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef } from "react";
import useTasksContext, { TaskType } from "../hooks/useTasksContext";
import Task from "./Task";
import AddTaskButton from "./AddTaskButton";
import EnterTaskTitle from "./EnterTaskTitle";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import { Draggable } from "react-beautiful-dnd";

type TaskListProps = {
    index: number;
    name: string;
    listId: string;
    tasksIds: [string];
    boardId: string;
};

const TaskList: React.FC<TaskListProps> = ({ index, boardId, listId, name, tasksIds }) => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const data = useTasksContext(boardId);
    const unOrderedTasks = data ? data.filter((task) => task.listId === listId) : null;
    let taskLookup: Map<string, TaskType> | null = null;
    if (unOrderedTasks) {
        taskLookup = new Map();
        unOrderedTasks.forEach((task) => taskLookup?.set(task._id, task));
    }

    const tasks = tasksIds.map((taskId) => taskLookup?.get(taskId));

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
                    <Typography {...provided.dragHandleProps} variant="subtitle1">
                        {name}
                    </Typography>

                    <Box ref={containerRef} id="container" sx={{ overflowY: "auto", overflowX: "hidden", maxHeight }}>
                        <Droppable type="tasks" droppableId={listId}>
                            {(provided) => (
                                <div style={{ minHeight: "1px" }} {...provided.droppableProps} ref={provided.innerRef}>
                                    {tasks && tasks.map((task, index) => task && <Task key={task._id} name={task.name} taskId={task._id} index={index} />)}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <Box sx={{ flexBasis: "300px", flexShrink: "0", mt: 2 }}>
                            <EnterTaskTitle boardId={boardId} first={first} setFirst={setFirst} listId={listId} />
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
