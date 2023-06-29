import { Card, CardContent, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import useUpdateTaskMutation from "../hooks/useUpdateTaskMutation";
import { TaskType } from "../hooks/useTasksContext";
import ClickAwayListener from "@mui/base/ClickAwayListener";

type TaskProps = {
    boardId: string;
    task: TaskType;
    index: number;
};

const Task: React.FC<TaskProps> = ({ boardId, task, index }) => {
    const { _id: taskId, name } = task;
    const theme = useTheme();
    const mode = theme.palette.mode;
    const updateTaskMutation = useUpdateTaskMutation();
    const [editTName, setEditTName] = useState(false);
    const [inputTName, setInputTName] = useState(name);
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
                        <CardContent sx={{ mt: "1px", p: 1, paddingBottom: "8px !important" }}>
                            <Typography onClick={() => setEditTName(true)} {...provided.dragHandleProps}>
                                {inputTName}
                            </Typography>
                        </CardContent>
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
                                inputRef={(input) => input && input.focus()}
                                onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                            />
                        </ClickAwayListener>
                    )}
                </Card>
            )}
        </Draggable>
    );
};

export default Task;
