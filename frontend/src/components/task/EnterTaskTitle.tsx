import { Collapse, Stack, TextField, Button, IconButton, useTheme } from "@mui/material";
import React from "react";
import useAuthContext from "../../hooks/context/useAuthContext";
import CloseIcon from "@mui/icons-material/Close";
import useCreateTaskMutation from "../../hooks/task/useCreateTaskMutation";
import { CreateTaskType } from "../../types/taskTypes";

type EnterTaskTitleProps = {
    first: boolean;
    setFirst: React.Dispatch<React.SetStateAction<boolean>>;
    listId: string;
    boardId: string;
    workspaceId: string;
};

const EnterTaskTitle: React.FC<EnterTaskTitleProps> = ({ first, setFirst, listId, boardId, workspaceId }) => {
    const createTaskMutation = useCreateTaskMutation();
    const user = useAuthContext();
    const theme = useTheme();
    const mode = theme.palette.mode;
    const [name, setName] = React.useState("");

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user) {
            const task: CreateTaskType = { name, workspaceId, listId, boardId, createdBy: user.uid };
            try {
                await createTaskMutation.mutateAsync(task);
                setName("");
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    };

    return (
        <Collapse in={!first}>
            <form onSubmit={handleSubmit}>
                <Stack
                    spacing={1}
                    sx={{
                        mr: 1,
                        borderRadius: 2,
                    }}
                >
                    <TextField
                        inputProps={{ style: { fontWeight: "400", fontSize: "0.875rem", lineHeight: "1.43", letterSpacing: "0.01071em" } }}
                        value={name}
                        onChange={handleChangeName}
                        sx={{ bgcolor: mode === "dark" ? "#22272b" : "white" }}
                        size="small"
                        variant="outlined"
                        focused
                        multiline
                        maxRows={5}
                        minRows={3}
                        placeholder="Enter a title for this card..."
                    />
                    <Stack direction="row">
                        <Button type="submit" size="small" variant="contained">
                            Add task
                        </Button>
                        <IconButton size="small" onClick={() => setFirst((prev) => !prev)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </form>
        </Collapse>
    );
};

export default EnterTaskTitle;
