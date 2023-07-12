import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, Stack } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SubjectIcon from "@mui/icons-material/Subject";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Unstable_Grid2/";
import TaskDescription from "./TaskDescription";
import TaskComments from "./TaskComments";
import { TaskType } from "../types/taskTypes";
import TaskCoverMenu from "./TaskCoverMenu";

type TaskdialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    listName: string;
    task: TaskType;
};

const TaskDialog: React.FC<TaskdialogProps> = ({ open, setOpen, listName, task }) => {
    const { name: taskName } = task;

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
                        <TaskDescription task={task} />

                        <Stack mt={2} alignItems="center" gap={2} direction="row">
                            <FormatAlignRightIcon />
                            <DialogContentText variant="subtitle1">Activity</DialogContentText>
                        </Stack>
                        <TaskComments task={task} />
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
                            <TaskCoverMenu />
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
