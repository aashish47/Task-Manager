import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import { useMediaQuery, useTheme } from "@mui/material";

const TaskDatesMenu = () => {
    const theme = useTheme();
    const isScreenMdAndAbove = useMediaQuery(theme.breakpoints.only("xs"));
    const orientation = isScreenMdAndAbove ? "portrait" : "landscape";
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
                color="secondary"
                fullWidth
                variant="outlined"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                Dates
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                    disablePadding: true,
                }}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
            >
                <StaticDateTimePicker slotProps={{ layout: { sx: { backgroundColor: "inherit" } } }} orientation={orientation} defaultValue={new Date()} />
            </Menu>
        </div>
    );
};

export default TaskDatesMenu;
