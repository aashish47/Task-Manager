import { IconButton, Badge, Menu, Typography, Box, Divider, MenuList } from "@mui/material";
import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useNotificationsContext from "../hooks/useNotificationsContext";
import NotificationCard from "./NotificationCard";

const stylesMenu = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "400px",
    whiteSpace: "pre-line",
    padding: "16px",
};

type NotificationMenuProps = {
    newNotifications: number;
    setNewNotifications: React.Dispatch<React.SetStateAction<number>>;
};

const NotificationMenu: React.FC<NotificationMenuProps> = ({ newNotifications, setNewNotifications }) => {
    const notifications = useNotificationsContext();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setNewNotifications(0);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleClick} size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={newNotifications} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                sx={{ top: 5 }}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Box sx={stylesMenu}>
                    <Box sx={{ pb: 3, width: "100%" }}>
                        <Typography variant="h6">Notifications</Typography>
                    </Box>
                    <Divider sx={{ width: "100%" }} />
                    <MenuList sx={{ width: "100%" }}>
                        {notifications &&
                            notifications.map((notification) => {
                                return <NotificationCard key={notification._id} notification={notification} />;
                            })}
                    </MenuList>
                </Box>
            </Menu>
        </div>
    );
};

export default NotificationMenu;
