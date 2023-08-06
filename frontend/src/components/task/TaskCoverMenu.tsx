import CloseIcon from "@mui/icons-material/Close";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import * as React from "react";
import { useState } from "react";
import useSearchPhotos from "../../hooks/photo/useSearchPhotos";
import { TaskType } from "../../types/taskTypes";
import SearchCover from "./SearchCover";
import CoverImages from "./TaskCoverImages";
// @ts-ignore
import { MuiColorInput, MuiColorInputFormat, MuiColorInputValue } from "mui-color-input";
import useUpdateTaskMutation from "../../hooks/task/useUpdateTaskMutation";

type TaskDatesCoverProps = {
    task: TaskType;
};

const TaskCoverMenu: React.FC<TaskDatesCoverProps> = ({ task }) => {
    // const defaultPhotos = useGetDefaultPhotos()?.response?.results;
    const searchPhotos = useSearchPhotos("Wallpapers")?.response?.results;
    const updateTaskMutation = useUpdateTaskMutation();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [value, setValue] = useState<MuiColorInputValue>("");
    const format: MuiColorInputFormat = "hex";

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleRemoveCover = async () => {
        try {
            const { _id: taskId, boardId } = task;
            const newTask = { ...task, cover: "" };
            await updateTaskMutation.mutateAsync({ boardId, taskId, newTask });
        } catch (error) {
            console.log(error);
        }
        handleClose();
    };

    return (
        <div>
            <Button
                color="inherit"
                fullWidth
                variant="outlined"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                cover
            </Button>
            <Menu
                sx={{ top: "-10px" }}
                slotProps={{ paper: { sx: { width: "350px", height: "100%" } } }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Container fixed>
                    <Stack alignItems="center" direction="row">
                        <Typography sx={{ flexGrow: 2, textAlign: "center" }}>Cover</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Stack sx={{ mt: 1 }} gap={1.5}>
                        <Button onClick={handleRemoveCover} variant="contained" size="small" color="secondary" fullWidth>
                            remove cover
                        </Button>
                        <Box>
                            <Typography variant="caption" fontWeight={500}>
                                Colors
                            </Typography>
                            <MuiColorInput size="small" fullWidth value={value} onChange={handleChange} format={format} />{" "}
                        </Box>
                        <Box>
                            <Typography variant="caption" fontWeight={500}>
                                Photos fron Unspalsh
                            </Typography>
                            <CoverImages handleClose={handleClose} task={task} variant="standard" photos={searchPhotos?.slice(0, 12)} />
                        </Box>
                        <SearchCover task={task} handleCloseCoverMenu={handleClose} />
                    </Stack>
                </Container>
            </Menu>
        </div>
    );
};

export default TaskCoverMenu;
