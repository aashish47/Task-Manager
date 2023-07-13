import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Chip, IconButton, InputAdornment, Stack, useMediaQuery, useTheme } from "@mui/material";
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
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import TaskDatesMenu from "./TaskDates";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

type TaskdialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    listName: string;
    task: TaskType;
};

const TaskDialog: React.FC<TaskdialogProps> = ({ open, setOpen, listName, task }) => {
    const { name: taskName } = task;
    const [checked, setChecked] = useState(false);
    const chipLabel = checked ? "Completed" : "Overdue";
    const chipColor = checked ? "success" : "error";
    const theme = useTheme();
    const isScreenMdAndAbove = useMediaQuery(theme.breakpoints.only("xs"));
    const orientation = isScreenMdAndAbove ? "portrait" : "landscape";
    const handleClose = () => {
        setOpen(false);
    };

    const handleCheckbox = () => {
        setChecked(!checked);
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

                        <Stack sx={{ width: "fit-content", ml: "40px" }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <DialogContentText variant="caption">Due Date</DialogContentText>
                                <IconButton>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Stack>

                            <Stack direction="row">
                                <Checkbox checked={checked} onChange={handleCheckbox} inputProps={{ "aria-label": "controlled" }} size="small" />

                                <MobileDateTimePicker
                                    orientation={orientation}
                                    defaultValue={new Date()}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            InputProps: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Chip color={chipColor} label={chipLabel} />
                                                    </InputAdornment>
                                                ),
                                            },
                                        },
                                    }}
                                />
                            </Stack>
                        </Stack>

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
                            <TaskDatesMenu />
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
