import { Card, CardContent, CardMedia, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import useUpdateTaskMutation from "../hooks/useUpdateTaskMutation";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import TaskActions from "./TaskActions";
import { TaskType } from "../types/taskTypes";
import TaskDialog from "./TaskDialog";

type TaskProps = {
    boardId: string;
    task: TaskType;
    index: number;
    listName: string;
};

const Task: React.FC<TaskProps> = ({ boardId, task, index, listName }) => {
    const [open, setOpen] = useState(false);
    const { _id: taskId, name: taskName, cover } = task;
    const theme = useTheme();
    const mode = theme.palette.mode;
    const updateTaskMutation = useUpdateTaskMutation();
    const [editTName, setEditTName] = useState(false);
    const [inputTName, setInputTName] = useState(taskName);
    const [changeValue, setChangeValue] = useState(inputTName);

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
        if (task && inputTName && changeValue !== inputTName) {
            const newTask = { ...task, name: changeValue };
            await updateTaskMutation.mutateAsync({ boardId, taskId, newTask });
        }
    };

    return (
        <>
            <Draggable draggableId={taskId} index={index}>
                {(provided) => (
                    <Card
                        onClick={() => setOpen(true)}
                        component={"div"}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        sx={{
                            borderRadius: 2,
                            "&:hover": { cursor: "pointer" },
                            bgcolor: mode === "dark" ? "#22272b" : "white",
                            mb: 1,
                            mr: 0.5,
                        }}
                    >
                        {cover && <CardMedia sx={{ height: "150px" }} image={cover} />}
                        {!editTName ? (
                            <CardContent sx={{ mt: "1px", p: 1, paddingBottom: "8px !important" }}>
                                <Stack
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        setEditTName(true);
                                    }}
                                    component={"div"}
                                    direction="row"
                                    alignItems="flex-start"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="body2">{inputTName}</Typography>
                                    {/* <TaskActions boardId={boardId} taskId={taskId} /> */}
                                </Stack>
                            </CardContent>
                        ) : (
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <TextField
                                    inputProps={{ style: { fontWeight: "400", fontSize: "0.875rem", lineHeight: "1.43", letterSpacing: "0.01071em" } }}
                                    onKeyDown={handleKeyDown}
                                    value={changeValue}
                                    onChange={(e) => setChangeValue(e.target.value)}
                                    sx={{
                                        "& .MuiInputBase-root": { padding: "8px", borderRadius: cover === "" ? "8px" : "0px 0px 8px 8px" },
                                        mt: "1px",
                                        bgcolor: mode === "dark" ? "#22272b" : "white",
                                    }}
                                    size="small"
                                    fullWidth
                                    autoFocus
                                    focused
                                    multiline
                                    // inputRef={(input) => input && input.focus()}
                                    onFocus={(e) => e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)}
                                />
                            </ClickAwayListener>
                        )}
                    </Card>
                )}
            </Draggable>
            <TaskDialog listName={listName} task={task} open={open} setOpen={setOpen} />
        </>
    );
};

export default Task;
