import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Container, IconButton, ImageList, ImageListItem, Stack, Typography } from "@mui/material";
import useGetDefaultPhotos from "../hooks/useGetDefaultPhotos";
import { MuiColorInput, MuiColorInputValue, MuiColorInputFormat } from "mui-color-input";
import { useState } from "react";
import SearchCover from "./SearchCover";

const TaskCoverMenu = () => {
    const defaultPhotos = useGetDefaultPhotos()?.response?.results;
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
    return (
        <div>
            <Button
                color="secondary"
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
                        <Button variant="contained" size="small" color="secondary" fullWidth>
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
                            {defaultPhotos && (
                                <ImageList cols={3} gap={2}>
                                    {defaultPhotos.map((photo) => (
                                        <ImageListItem key={photo.id}>
                                            <img src={photo.urls.thumb} alt={photo.description?.toString()} />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            )}
                        </Box>
                        <SearchCover handleCloseCoverMenu={handleClose} />
                    </Stack>
                </Container>
            </Menu>
        </div>
    );
};

export default TaskCoverMenu;
