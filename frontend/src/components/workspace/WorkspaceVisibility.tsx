import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import { Container, IconButton, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";

const WorkspaceVisibility = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ alignItems: "flex-start" }}
                size="small"
                color="inherit"
                variant="outlined"
            >
                Change
            </Button>
            <Menu
                slotProps={{ paper: { sx: { width: "300px" } } }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Container>
                    <Stack alignItems="center" direction="row">
                        <Typography variant="subtitle2" sx={{ flexGrow: 2, textAlign: "center" }}>
                            Select Workspace Visibility
                        </Typography>
                        <IconButton color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                </Container>
                <MenuItem sx={{ whiteSpace: "pre-line" }} onClick={handleClose}>
                    <Stack>
                        <Stack gap={1} direction="row">
                            <LockIcon fontSize="small" color="error" />
                            <Typography variant="subtitle2" fontWeight={400}>
                                Private
                            </Typography>
                        </Stack>
                        <Typography variant="caption">This Workspace is private. It's not indexed or visible to those outside the Workspace.</Typography>
                    </Stack>
                </MenuItem>

                <MenuItem sx={{ whiteSpace: "pre-line" }} onClick={handleClose}>
                    <Stack>
                        <Stack gap={1} direction="row">
                            <PublicIcon fontSize="small" color="success" />
                            <Typography variant="subtitle2" fontWeight={400}>
                                Public
                            </Typography>
                        </Stack>
                        <Typography variant="caption">
                            This Workspace is public. It's visible to anyone with the link and will show up in search engines like Google. Only those invited to
                            the Workspace can add and edit Workspace boards.
                        </Typography>
                    </Stack>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default WorkspaceVisibility;
