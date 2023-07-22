import { Stack, Box, TextField, ClickAwayListener, Button, Typography } from "@mui/material";
import RichTextEdtitor from "./RichTextEditor";
import { useState } from "react";
import { TaskType } from "../../types/taskTypes";
import useUpdateTaskMutation from "../../hooks/task/useUpdateTaskMutation";

type TaskDescriptionProps = {
    task: TaskType;
};

const TaskDescription: React.FC<TaskDescriptionProps> = ({ task }) => {
    const { _id: taskId, boardId, description } = task;

    const [value, setValue] = useState(description);
    const [editDescription, setEditDescription] = useState(false);
    const updateTaskMutation = useUpdateTaskMutation();

    const handleSaveClick = async () => {
        let description = value;
        if (value === "" || value.slice(3, value.length - 4).trim() === "" || value === "<p><br></p>") {
            setValue("");
            description = "";
        }
        const newTask = { ...task, description };
        await updateTaskMutation.mutateAsync({ boardId, taskId, newTask });
        setEditDescription(false);
    };

    return (
        <Stack alignItems="center" gap={1} direction="row">
            <Box sx={{ width: "30px" }} />
            {!editDescription && !description && (
                <TextField onClick={() => setEditDescription(true)} margin="normal" placeholder="Add a more detailed description..." fullWidth />
            )}

            {!editDescription && description && (
                <Typography sx={{ mx: "15px", lineHeight: 0.52 }} variant="body2" component={"div"} onClick={() => setEditDescription(true)}>
                    <div dangerouslySetInnerHTML={{ __html: value }} />
                </Typography>
            )}

            {editDescription && (
                <ClickAwayListener onClickAway={handleSaveClick}>
                    <Stack sx={{ ml: "12px" }}>
                        <RichTextEdtitor value={value} setValue={setValue} />
                        <Button onClick={handleSaveClick} sx={{ mt: 1, alignSelf: "flex-end" }} variant="contained">
                            Save
                        </Button>
                    </Stack>
                </ClickAwayListener>
            )}
        </Stack>
    );
};

export default TaskDescription;
