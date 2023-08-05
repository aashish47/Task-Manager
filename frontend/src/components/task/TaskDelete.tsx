import { Button } from "@mui/material";
import * as React from "react";
import useDeleteTaskMutation from "../../hooks/task/useDeleteTaskMutation";
import { TaskType } from "../../types/taskTypes";
import DeleteDialog from "../common/DeleteDialog";

type TaskDeleteProps = {
    task: TaskType;
};

const TaskDelete: React.FC<TaskDeleteProps> = ({ task }) => {
    const { _id: taskId, boardId, name } = task;
    const [open, setOpen] = React.useState(false);
    const deleteTaskMutation = useDeleteTaskMutation();

    const handleDelete = async () => {
        try {
            await deleteTaskMutation.mutateAsync({ boardId, taskId });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)} color="secondary" fullWidth variant="outlined">
                Delete
            </Button>
            <DeleteDialog type="task" name={name} handleDelete={handleDelete} open={open} setOpen={setOpen} />
        </div>
    );
};

export default TaskDelete;
