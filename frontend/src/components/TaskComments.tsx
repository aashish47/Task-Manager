import { Stack, Avatar, TextField, ClickAwayListener, useTheme, Button, Typography, Box, Card, CardContent, CardActions, IconButton } from "@mui/material";
import { teal } from "@mui/material/colors";
import RichTextEdtitor from "./RichTextEditor";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { TaskType } from "../types/taskTypes";
import useCreateCommentMutation from "../hooks/useCreateComment";
import useCommentsContext from "../hooks/useCommentsContext";
import "../styles/TaskComments.css";
import { format, formatDistanceToNow } from "date-fns";
import DatePopover from "./DatePopover";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteCommentMutation from "../hooks/useDeleteCommentMutation";

type TaskCommentsProps = {
    task: TaskType;
};

const TaskComments: React.FC<TaskCommentsProps> = ({ task }) => {
    const { _id: taskId } = task;
    const [value, setValue] = useState("");
    const theme = useTheme();
    const mode = theme.palette.mode;
    const user = useAuthContext();
    const [editComment, setEditComment] = useState(false);
    const createCommentMutation = useCreateCommentMutation();
    const deleteCommentMutation = useDeleteCommentMutation();
    const comments = useCommentsContext(taskId);
    console.log(comments);

    const handleCommentClick = async () => {
        let description = value;
        if (value === "" || value.slice(3, value.length - 4).trim() === "" || value === "<p><br></p>") {
            setValue("");
            description = "";
        }

        if (user) {
            const { uid, displayName } = user;
            const createdBy = displayName || "";

            await createCommentMutation.mutateAsync({ taskId, description, uid, createdBy });
        }
        setEditComment(false);
        setValue("");
    };

    const handleDeleteComment = async (commentId: string, taskId: string) => {
        await deleteCommentMutation.mutateAsync({ commentId, taskId });
    };

    return (
        <Stack>
            <Stack alignItems="baseline" gap={1} direction="row">
                <Avatar variant="rounded" sx={{ bgcolor: mode === "dark" ? teal[200] : teal[700], width: "30px", height: "30px" }}>
                    {user?.displayName?.charAt(0)}
                </Avatar>
                {!editComment && <TextField onClick={() => setEditComment(true)} margin="normal" size="small" placeholder="Write a comment..." fullWidth />}
                {editComment && (
                    <ClickAwayListener onClickAway={() => setEditComment(false)}>
                        <Stack sx={{ ml: "12px" }}>
                            <RichTextEdtitor value={value} setValue={setValue} />
                            <Button onClick={handleCommentClick} sx={{ mt: 1, alignSelf: "flex-end" }} variant="contained">
                                comment
                            </Button>
                        </Stack>
                    </ClickAwayListener>
                )}
            </Stack>
            {comments &&
                comments.map((comment) => {
                    const userId = user?.uid;
                    const { _id: commentId, createdAt, createdBy, description, taskId, uid: commentedBy } = comment;
                    const time = formatDistanceToNow(new Date(createdAt));
                    const created = format(new Date(createdAt), "PPPPpppp");
                    return (
                        <Stack mt={1}>
                            <Stack alignItems="center" key={taskId} direction="row" gap={1}>
                                <Avatar sx={{ mr: 1, bgcolor: mode === "dark" ? teal[200] : teal[700], width: "24px", height: "24px" }}>
                                    <Box sx={{ fontSize: "16px" }}>{createdBy.charAt(0)}</Box>
                                </Avatar>
                                <Typography>{createdBy}</Typography>
                                <DatePopover time={time} created={created} />
                            </Stack>
                            <Card sx={{ ml: 5 }}>
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        direction: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        p: 1,
                                        "&.MuiCardContent-root:last-child": { pb: 1 },
                                    }}
                                >
                                    <Box className="comment" dangerouslySetInnerHTML={{ __html: description }} />
                                    {userId === commentedBy && (
                                        <IconButton onClick={() => handleDeleteComment(commentId, taskId)} sx={{ alignSelf: "flex-start" }}>
                                            <DeleteIcon fontSize="small" color="error" />
                                        </IconButton>
                                    )}
                                </CardContent>
                            </Card>
                        </Stack>
                    );
                })}
        </Stack>
    );
};

export default TaskComments;
