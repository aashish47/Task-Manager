import { Collapse, Stack, TextField, Button, IconButton, useTheme } from "@mui/material";
import React from "react";
import useAuthContext from "../hooks/useAuthContext";
import CloseIcon from "@mui/icons-material/Close";
import useCreateTaskMutation from "../hooks/useCreateTaskMutation";

type EnterTaskTitleProp = {
    first: boolean;
    setFirst: React.Dispatch<React.SetStateAction<boolean>>;
    listId: string;
    boardId: string;
};
export type Task = {
    name: string;
    listId: string;
    boardId: string;
    createdBy: string;
};
const EnterTaskTitle: React.FC<EnterTaskTitleProp> = ({ first, setFirst, listId, boardId }) => {
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
            const task: Task = { name, listId, boardId, createdBy: user.uid };
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
                        bgcolor: mode === "dark" ? "#100901" : "#ededed",
                    }}
                >
                    <TextField
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
