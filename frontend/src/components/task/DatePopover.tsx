import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

type DatePopoverProps = {
    time: string;
    created: string;
};

const DatePopover: React.FC<DatePopoverProps> = ({ time, created }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div style={{ display: "inline-block" }}>
            <Typography
                sx={{
                    "&:hover": {
                        cursor: "pointer",
                    },
                }}
                variant="caption"
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                {time} ago
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: "none",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>{created}</Typography>
            </Popover>
        </div>
    );
};

export default DatePopover;
