import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import useUpdateTaskMutation from "../hooks/useUpdateTaskMutation";
import { TaskType } from "../types/taskTypes";

type TaskDatesMenuProps = {
    task: TaskType;
};

const TaskDatesMenu: React.FC<TaskDatesMenuProps> = ({ task }) => {
    const { boardId, _id: taskId, dueDate } = task;
    const updateTaskMutation = useUpdateTaskMutation();
    const theme = useTheme();
    const isScreenMdAndAbove = useMediaQuery(theme.breakpoints.only("xs"));
    const orientation = isScreenMdAndAbove ? "portrait" : "landscape";

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const date = dueDate ? new Date(dueDate) : null;
    const [value, setValue] = useState<Date | null>(date);
    const [changeValue, setChangeValue] = useState<Date | null>(value);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAccept = async () => {
        setValue(changeValue);
        const newTask = { ...task, dueDate: changeValue };
        await updateTaskMutation.mutateAsync({ boardId, taskId, newTask });
        handleClose();
    };
    const handleCancel = () => {
        handleClose();
    };

    useEffect(() => {
        setValue(dueDate ? new Date(dueDate) : null);
    }, [dueDate]);

    return (
        <div>
            <Button
                color="secondary"
                fullWidth
                variant="outlined"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                Dates
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                    disablePadding: true,
                }}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
            >
                <StaticDateTimePicker
                    ampm
                    value={value}
                    onChange={(newValue) => setChangeValue(newValue)}
                    slotProps={{
                        layout: { sx: { backgroundColor: "inherit" } },
                        // @ts-ignore
                        actionBar: { actions: ["today", "cancel", "accept"], onAccept: handleAccept, onCancel: handleCancel },
                    }}
                    orientation={orientation}
                    defaultValue={new Date()}
                />
            </Menu>
        </div>
    );
};

export default TaskDatesMenu;
