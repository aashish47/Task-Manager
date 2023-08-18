import AccountCircle from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MailIcon from "@mui/icons-material/Mail";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { Divider, Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { auth } from "../../firebase/firebase";
import { getFirebaseAuth } from "../../firebase/firebase";
import CreateMenu from "./CreateMenu";
import Logo from "./Logo";
import NotificationMenu from "./NotificationsMenu";
import RecentMenu from "./RecentMenu";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StarredMenu from "./StarredMenu";
import StyledInputBase from "./StyledInputBase";
import WorkspaceMenu from "./WorkspaceMenu";

type NavBarAuthProps = {
    newNotifications: number;
    setNewNotifications: React.Dispatch<React.SetStateAction<number>>;
    darkmode: boolean;
    setDarkmode: (value: boolean) => void;
};

const NavBarAuth: React.FC<NavBarAuthProps> = ({ newNotifications, setNewNotifications, darkmode, setDarkmode }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const navigate = useNavigate();
    const handleLogout = async () => {
        const auth = getFirebaseAuth();
        if (auth) {
            try {
                await auth.signOut();
                navigate("/");
            } catch (error) {
                console.log("Error signing out:", error);
            }
        }
        handleMenuClose();
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexShrink: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Link component={NavLink} to={"/"}>
                        <Logo />
                    </Link>
                    <Box sx={{ flexGrow: 1, gap: 1.2, display: "flex", ml: 2, alignItems: "center" }}>
                        <WorkspaceMenu />
                        <RecentMenu />
                        <StarredMenu />
                        <CreateMenu />
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
                    </Search>

                    <IconButton sx={{ ml: 1 }} onClick={() => setDarkmode(!darkmode)} color="inherit">
                        {darkmode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>

                    <NotificationMenu newNotifications={newNotifications} setNewNotifications={setNewNotifications} />
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>

                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Divider />
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
};

export default NavBarAuth;
