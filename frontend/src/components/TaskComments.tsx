import { Stack, Avatar, TextField, ClickAwayListener, useTheme } from "@mui/material";
import { teal } from "@mui/material/colors";
import RichTextEdtitor from "./RichTextEditor";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";

const TaskComments = () => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const user = useAuthContext();
    const [editComment, setEditComment] = useState(false);
    return (
        <Stack alignItems="baseline" gap={1} direction="row">
            <Avatar sx={{ bgcolor: mode === "dark" ? teal[200] : teal[700], width: "30px", height: "30px" }}>{user?.displayName?.charAt(0)}</Avatar>
            {!editComment && <TextField onClick={() => setEditComment(true)} margin="normal" size="small" placeholder="Write a comment..." fullWidth />}
            {editComment && (
                <ClickAwayListener onClickAway={() => setEditComment(false)}>
                    <div>
                        <RichTextEdtitor />
                    </div>
                </ClickAwayListener>
            )}
        </Stack>
    );
};

export default TaskComments;
