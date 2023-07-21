import * as React from "react";
import Button from "@mui/material/Button";
import { Box, Container, Divider, Drawer, IconButton, TextField, Typography, useTheme } from "@mui/material";
import useSearchPhotos from "../hooks/useSearchPhotos";
import { BoardType } from "../types/boardTypes";
import BoardCoverImages from "./BoardCoverImages";
import { drawerWidth } from "../constants/constants";
import DrawerHeader from "./DrawerHeader";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type SearchCoverProps = {
    board: BoardType;
    handleCloseBackgroundDrawer: () => void;
};

const BoardSearchCover: React.FC<SearchCoverProps> = ({ board, handleCloseBackgroundDrawer }) => {
    const [value, setValue] = React.useState("");
    const [query, setQuery] = React.useState("Wallpapers");
    const searchPhotos = useSearchPhotos(query)?.response?.results;
    const [open, setOpen] = React.useState<boolean>(false);
    const theme = useTheme();
    // const open = Boolean(anchorEl);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseAll = () => {
        setOpen(false);
        handleCloseBackgroundDrawer();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (e.key === "Enter") {
            setQuery(value);
        }
    };

    return (
        <Box>
            <Button
                size="small"
                color="secondary"
                variant="contained"
                fullWidth
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                Search for photos
            </Button>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        top: "48px",
                        height: "100%",
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader sx={{ justifyContent: "space-between", minHeight: "49px!important" }}>
                    <IconButton onClick={handleClose}>{theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
                    <Typography variant="subtitle1">Search Unsplash for photos</Typography>
                    <Box sx={{ width: 40, height: 40 }} />
                </DrawerHeader>
                <Divider />

                <Container fixed>
                    <Box id="fix" sx={{ position: "sticky" }}>
                        <TextField
                            sx={{ mt: 1 }}
                            fullWidth
                            onKeyDown={handleKeyDown}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            size="small"
                            placeholder="Search Unsplash for photos"
                        />
                    </Box>

                    <Box id="scroll" sx={{ mt: 1, maxHeight: "calc(100vh - 160px)", overflowY: "auto" }}>
                        <BoardCoverImages handleClose={handleCloseAll} board={board} variant="standard" photos={searchPhotos} />
                    </Box>
                </Container>
            </Drawer>
        </Box>
    );
};

export default BoardSearchCover;
