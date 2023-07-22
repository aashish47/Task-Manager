import * as React from "react";
import Button from "@mui/material/Button";
import { Box, Container, Divider, Drawer, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { BoardType } from "../../types/boardTypes";
import BoardCoverImages from "./BoardCoverImages";
import BoardSearchCover from "./BoardSearchCover";
import { drawerWidth } from "../../constants/constants";
import DrawerHeader from "../workspace/DrawerHeader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// @ts-ignore
import { MuiColorInput, MuiColorInputValue, MuiColorInputFormat } from "mui-color-input";
import useSearchPhotos from "../../hooks/photo/useSearchPhotos";

type BoardChangeBackgroundProps = {
    board: BoardType;
};

const BoardChangeBackground: React.FC<BoardChangeBackgroundProps> = ({ board }) => {
    // const defaultPhotos = useGetDefaultPhotos()?.response?.results;
    const searchPhotos = useSearchPhotos("Wallpapers")?.response?.results;
    const [open, setOpen] = React.useState<boolean>(false);
    const theme = useTheme();
    const [value, setValue] = useState<MuiColorInputValue>("");
    const format: MuiColorInputFormat = "hex";
    const name = "Change background";

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <div>
            <ListItem key={name} disablePadding>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <FavoriteBorderIcon />
                    </ListItemIcon>
                    <ListItemText secondary={name} />
                </ListItemButton>
            </ListItem>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        top: "48px",
                        height: "100%",
                        overflowY: "hidden",
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader sx={{ justifyContent: "space-between", minHeight: "49px!important" }}>
                    <IconButton onClick={handleClose}>{theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>

                    <Typography variant="subtitle1">Background Cover</Typography>
                    <Box sx={{ width: 40, height: 40 }} />
                </DrawerHeader>
                <Divider />

                <Container fixed>
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
                            <BoardCoverImages handleClose={handleClose} board={board} variant="standard" photos={searchPhotos?.slice(0, 15)} />
                        </Box>
                        <BoardSearchCover board={board} handleCloseBackgroundDrawer={handleClose} />
                    </Stack>
                </Container>
            </Drawer>
        </div>
    );
};

export default BoardChangeBackground;
