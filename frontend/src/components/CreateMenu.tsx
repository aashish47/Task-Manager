import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import CreateWorkspace from "./CreateWorkspace";
import CreateBoard from "./CreateBoard";

const stylesMenu = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "350px",
    whiteSpace: "pre-line",
};

export default function CreateMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [openCreateWorkspace, setOpenCreateWorkspace] = React.useState(false);
    const [openCreateBoard, setOpenCreateBoard] = React.useState(false);
    // const [anchorElBoard, setAnchorElBoard] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCreateWokspace = () => {
        setOpenCreateWorkspace(true);
        handleClose();
    };

    const handleCreateBoard = () => {
        setOpenCreateBoard(true);
        handleClose();
        console.log("click");
    };

    return (
        <div>
            <Button
                sx={{ display: { xs: "none", sm: "block" } }}
                variant="contained"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                Create
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                sx={{ top: 15 }}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleCreateWokspace} sx={stylesMenu}>
                    <div style={{ display: "flex", gap: "5px" }}>
                        <WorkspacesIcon />
                        <Typography variant="subtitle1">Create Workspace</Typography>
                    </div>
                    <Typography variant="caption">
                        A Workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends.{" "}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleCreateBoard} sx={stylesMenu}>
                    <div style={{ display: "flex", gap: "5px" }}>
                        <DashboardIcon />
                        <Typography variant="subtitle1">Create Board</Typography>
                    </div>

                    <Typography variant="caption">
                        A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.
                    </Typography>
                </MenuItem>
            </Menu>
            <CreateWorkspace open={openCreateWorkspace} setOpen={setOpenCreateWorkspace} />
            <CreateBoard open={openCreateBoard} setOpen={setOpenCreateBoard} />
        </div>
    );
}
