import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, Box, ClickAwayListener, IconButton, Stack, Typography, useTheme } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SubjectIcon from "@mui/icons-material/Subject";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import useAuthContext from "../hooks/useAuthContext";
import { teal } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import RichTextEdtitor from "./RichTextEditor";
import { useState } from "react";

type TaskdialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    listName: string;
    taskName: string;
};

const TaskDialog: React.FC<TaskdialogProps> = ({ open, setOpen, listName, taskName }) => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const user = useAuthContext();
    const [comment, setComment] = useState(false);
    const [description, setDescription] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
            <DialogTitle>
                <Stack gap={2} direction="row">
                    <EventNoteIcon />
                    <Stack gap={1}>
                        <DialogContentText lineHeight={1.3} variant="inherit">
                            {taskName}
                        </DialogContentText>
                        <DialogContentText variant="caption">in list {listName}</DialogContentText>
                    </Stack>
                    <Box sx={{ flexGrow: 1 }} />
                    <DialogActions disableSpacing>
                        <IconButton sx={{ display: { sm: "none" } }}>
                            <MoreHorizIcon />
                        </IconButton>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                </Stack>
            </DialogTitle>
            <DialogContent sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={9}>
                        <Stack gap={2} alignItems="center" direction="row">
                            <SubjectIcon />
                            <DialogContentText variant="subtitle1">Description</DialogContentText>
                        </Stack>
                        <Stack alignItems="center" gap={1} direction="row">
                            <Box sx={{ width: "30px" }} />
                            {!description && (
                                <TextField onClick={() => setDescription(true)} margin="normal" placeholder="Add a more detailed description..." fullWidth />
                            )}
                            {description && (
                                <ClickAwayListener onClickAway={() => setDescription(false)}>
                                    <Box sx={{ ml: "12px" }}>
                                        <RichTextEdtitor />
                                    </Box>
                                </ClickAwayListener>
                            )}
                        </Stack>

                        <Stack mt={2} alignItems="center" gap={2} direction="row">
                            <FormatAlignRightIcon />
                            <DialogContentText variant="subtitle1">Activity</DialogContentText>
                        </Stack>
                        <Stack alignItems="baseline" gap={1} direction="row">
                            <Avatar sx={{ bgcolor: mode === "dark" ? teal[200] : teal[700], width: "30px", height: "30px" }}>
                                {user?.displayName?.charAt(0)}
                            </Avatar>
                            {!comment && <TextField onClick={() => setComment(true)} margin="normal" size="small" placeholder="Write a comment..." fullWidth />}
                            {comment && (
                                <ClickAwayListener onClickAway={() => setComment(false)}>
                                    <div>
                                        <RichTextEdtitor />
                                    </div>
                                </ClickAwayListener>
                            )}
                        </Stack>
                    </Grid>
                    <Grid sx={{ display: { xs: "none", sm: "block" } }} sm={3}>
                        <Stack gap={1}>
                            <Button color="secondary" fullWidth variant="outlined">
                                members
                            </Button>
                            <Button color="secondary" fullWidth variant="outlined">
                                labels
                            </Button>
                            <Button color="secondary" fullWidth variant="outlined">
                                dates
                            </Button>
                            <Button color="secondary" fullWidth variant="outlined">
                                cover
                            </Button>
                            <Button color="secondary" fullWidth variant="outlined">
                                checklist
                            </Button>
                            <Button color="secondary" fullWidth variant="outlined">
                                Delete
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default TaskDialog;
