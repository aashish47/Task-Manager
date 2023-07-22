import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import useDeleteTaskMutation from "../../hooks/task/useDeleteTaskMutation";

type TaskACtionsProps = {
    boardId: string;
    taskId: string;
};

const TaskActions: React.FC<TaskACtionsProps> = ({ boardId, taskId }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const deleteTaskMutation = useDeleteTaskMutation();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleDelete = async (event: any) => {
        event.stopPropagation();
        event.preventDefault();

        await deleteTaskMutation.mutateAsync({ boardId, taskId });
        handleClose(event);
    };
    const handleClose = (event: any) => {
        event.stopPropagation();
        event.preventDefault();

        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                sx={{ height: "20px", width: "20px" }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="inherit"
            >
                <MoreHorizIcon fontSize="small" />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </div>
    );
};

export default TaskActions;
