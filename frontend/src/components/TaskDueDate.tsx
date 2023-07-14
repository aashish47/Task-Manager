import { Stack, DialogContentText, IconButton, InputAdornment, Checkbox, Chip, useMediaQuery, useTheme } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import useUpdateTaskMutation from "../hooks/useUpdateTaskMutation";
import CloseIcon from "@mui/icons-material/Close";
import { TaskType } from "../types/taskTypes";

type TaskDueDateProps = {
    task: TaskType;
};

const TaskDueDate: React.FC<TaskDueDateProps> = ({ task }) => {
    const { dueDate, _id: taskId, boardId, isCompleted } = task;

    const [checked, setChecked] = useState(isCompleted);
    const chipLabel = checked ? "Completed" : "Overdue";
    const chipColor = checked ? "success" : "error";
    const theme = useTheme();
    const isScreenMdAndAbove = useMediaQuery(theme.breakpoints.only("xs"));
    const orientation = isScreenMdAndAbove ? "portrait" : "landscape";
    const [value, setValue] = useState<Date | null>(null);
    const updateTaskMutation = useUpdateTaskMutation();

    useEffect(() => {
        setValue(dueDate ? new Date(dueDate) : null);
    }, [dueDate]);

    useEffect(() => {
        setChecked(isCompleted);
    }, [isCompleted]);

    const handleCheckbox = async () => {
        const newTask = { ...task, isCompleted: !isCompleted };
        await updateTaskMutation.mutateAsync({ boardId, taskId, newTask });
    };

    const handleAccept = async (newValue: Date | null) => {
        const newTask = { ...task, dueDate: newValue };
        await updateTaskMutation.mutateAsync({ boardId, taskId, newTask });
    };

    const handleDeleteDate = async () => {
        const newTask = { ...task, dueDate: null, isCompleted: false };
        await updateTaskMutation.mutateAsync({ boardId, taskId, newTask });
    };

    return (
        dueDate && (
            <Stack sx={{ width: "fit-content", ml: "40px" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <DialogContentText variant="caption">Due Date</DialogContentText>
                    <IconButton onClick={handleDeleteDate}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Stack>

                <Stack direction="row">
                    <MobileDateTimePicker
                        onAccept={(newValue) => handleAccept(newValue)}
                        ampm
                        orientation={orientation}
                        value={value}
                        slotProps={{
                            textField: {
                                size: "small",
                                InputProps: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Checkbox
                                                onClick={(e) => e.stopPropagation()}
                                                checked={checked}
                                                onChange={handleCheckbox}
                                                inputProps={{ "aria-label": "controlled" }}
                                                size="small"
                                            />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment sx={{ ml: 0 }} position="end">
                                            <Chip onClick={(e) => e.stopPropagation()} sx={{ height: "auto" }} color={chipColor} label={chipLabel} />
                                        </InputAdornment>
                                    ),
                                },
                            },
                        }}
                    />
                </Stack>
            </Stack>
        )
    );
};

export default TaskDueDate;
