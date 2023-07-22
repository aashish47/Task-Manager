import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { Box, Container, IconButton, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useSearchPhotos from "../../hooks/photo/useSearchPhotos";
import CoverImages from "../common/CoverImages";
import { TaskType } from "../../types/taskTypes";

type SearchCoverProps = {
    task: TaskType;
    handleCloseCoverMenu: () => void;
};

const SearchCover: React.FC<SearchCoverProps> = ({ task, handleCloseCoverMenu }) => {
    const [value, setValue] = React.useState("");
    const [query, setQuery] = React.useState("Wallpapers");
    const searchPhotos = useSearchPhotos(query)?.response?.results;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseMenu = () => {
        handleCloseCoverMenu();
        handleClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (e.key === "Enter") {
            setQuery(value);
        }
    };

    return (
        <div>
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

            <Menu
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
                sx={{ top: "-10px" }}
                slotProps={{ paper: { sx: { overflowY: "hidden", width: "350px", height: "100%" } } }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Container fixed>
                    <Box id="fix" sx={{ position: "sticky" }}>
                        <Stack alignItems="center" direction="row">
                            <IconButton onClick={handleClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                            <Typography sx={{ flexGrow: 2, textAlign: "center" }}>Photo Search</Typography>
                            <IconButton onClick={handleCloseMenu}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>

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

                    <Box id="scroll" sx={{ mt: 1, maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                        <CoverImages handleClose={handleCloseCoverMenu} task={task} variant="standard" photos={searchPhotos} />
                    </Box>
                </Container>
            </Menu>
        </div>
    );
};

export default SearchCover;
