import { Card, CardContent, Link, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import useUpdateTaskMutation from "../hooks/useUpdateTaskMutation";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import TaskActions from "./TaskActions";
import { TaskType } from "../types/taskTypes";
import { NavLink } from "react-router-dom";
import TaskDialog from "./TaskDialog";

type TaskProps = {
    boardId: string;
    task: TaskType;
    index: number;
    listName: string;
};

const Task: React.FC<TaskProps> = ({ boardId, task, index, listName }) => {
    const [open, setOpen] = useState(false);
    const { _id: taskId, name: taskName } = task;
    const theme = useTheme();
    const mode = theme.palette.mode;
    const updateTaskMutation = useUpdateTaskMutation();
    const [editTName, setEditTName] = useState(false);
    const [inputTName, setInputTName] = useState(taskName);

    useEffect(() => {
        setInputTName(taskName);
    }, [taskName]);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleClickAway();
        }
    };

    const handleClickAway = async () => {
        setEditTName(false);
        if (task && inputTName) {
            const newTask = { ...task, name: inputTName };
            await updateTaskMutation.mutateAsync({ boardId, taskId, newTask });
        }
    };
    return (
        <Draggable draggableId={taskId} index={index}>
            {(provided) => (
                <Card
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    sx={{
                        bgcolor: mode === "dark" ? "#22272b" : "white",
                        mt: 2,
                        mr: 1,
                    }}
                >
                    {!editTName ? (
                        <Link
                            color="inherit"
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setEditTName(true);
                            }}
                            onClick={() => setOpen(true)}
                        >
                            <CardContent sx={{ "&:hover": { cursor: "pointer" }, mt: "1px", p: 1, paddingBottom: "8px !important" }}>
                                <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                                    <Typography>{inputTName}</Typography>
                                    <TaskActions boardId={boardId} taskId={taskId} />
                                </Stack>
                            </CardContent>
                        </Link>
                    ) : (
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <TextField
                                inputProps={{ style: { fontWeight: "400", fontSize: "1rem", lineHeight: "1.5", letterSpacing: "0.00938em" } }}
                                onKeyDown={handleKeyDown}
                                value={inputTName}
                                onChange={(e) => setInputTName(e.target.value)}
                                sx={{
                                    "& .MuiInputBase-root": { padding: "8px" },
                                    mt: "1px",
                                    bgcolor: mode === "dark" ? "#22272b" : "white",
                                }}
                                size="small"
                                variant="outlined"
                                fullWidth
                                autoFocus
                                focused
                                multiline
                                // inputRef={(input) => input && input.focus()}
                                onFocus={(e) => e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)}
                            />
                        </ClickAwayListener>
                    )}
                    <TaskDialog listName={listName} task={task} open={open} setOpen={setOpen} />
                </Card>
            )}
        </Draggable>
    );
};

export default Task;
