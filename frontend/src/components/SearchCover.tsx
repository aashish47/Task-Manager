import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { Container, IconButton, ImageList, ImageListItem, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useSearchPhotos from "../hooks/useSearchPhotos";

const SearchCover = () => {
    const [value, setValue] = React.useState("");
    const [query, setQuery] = React.useState("");
    const searchPhotos = useSearchPhotos(query)?.response?.results;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                        <IconButton>
                            <ChevronLeftIcon />
                        </IconButton>
                        <Typography sx={{ flexGrow: 2, textAlign: "center" }}>Photo Search</Typography>
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                    </Stack>

                    <Stack sx={{ mt: 1 }} gap={1.5}>
                        <TextField
                            onKeyDown={handleKeyDown}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            size="small"
                            placeholder="Search Unsplash for photos"
                        />
                        {searchPhotos && (
                            <ImageList variant="masonry" cols={3} gap={2}>
                                {searchPhotos.map((photo) => (
                                    <ImageListItem key={photo.id}>
                                        <img src={photo.urls.thumb} alt={photo.description ?? ""} />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        )}
                    </Stack>
                </Container>
            </Menu>
        </div>
    );
};

export default SearchCover;
