import Brightness4Icon from "@mui/icons-material/Brightness4";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { NavLink, useNavigate } from "react-router-dom";

import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Divider, Drawer, Link, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Logo from "./Logo";

type NavBarProps = {
    darkmode: boolean;
    setDarkmode: (value: boolean) => void;
};

const NavBar: React.FC<NavBarProps> = ({ darkmode, setDarkmode }) => {
    const pages = ["Features", "Solutions", "Plans", "Pricing", "Resources"];
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleClickLogin = () => {
        navigate("/login");
        handleCloseNavMenu();
    };

    return (
        <Box>
            <AppBar position="static">
                <Container sx={{ pr: { md: "0!important" } }} maxWidth="xl">
                    <Toolbar sx={{ height: "64px", pr: { md: "0!important" } }} variant="regular">
                        <Link
                            mr={2}
                            component={NavLink}
                            to="/"
                            sx={{
                                flexGrow: { xs: 1, md: 0 },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                textDecoration: "none",
                            }}
                        >
                            <Logo />
                        </Link>

                        {/* Mobile Menu */}
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton color="inherit" size="large" onClick={handleOpenNavMenu}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer anchor={"top"} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                                <Container maxWidth="xl">
                                    <Toolbar disableGutters>
                                        <Typography
                                            my={2}
                                            variant="h6"
                                            noWrap
                                            component={NavLink}
                                            onClick={handleCloseNavMenu}
                                            to="/"
                                            sx={{
                                                flexGrow: { xs: 1, md: 0 },
                                                fontFamily: "monospace",
                                                fontWeight: 700,
                                                letterSpacing: ".3rem",
                                                textDecoration: "none",
                                            }}
                                        >
                                            LOGO
                                        </Typography>
                                        <IconButton color="inherit" sx={{ mr: 1 }} onClick={() => setDarkmode(!darkmode)}>
                                            {darkmode ? <Brightness7Icon /> : <Brightness4Icon />}
                                        </IconButton>
                                        <IconButton color="inherit" size="large" onClick={handleCloseNavMenu}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Toolbar>
                                </Container>
                                <Divider variant="middle" />
                                <List disablePadding>
                                    {pages.map((page) => (
                                        <Box key={page}>
                                            <ListItem disableGutters>
                                                <ListItemButton onClick={handleCloseNavMenu}>
                                                    <ListItemText primaryTypographyProps={{ variant: "h6", fontWeight: 400 }} primary={page} />
                                                </ListItemButton>
                                            </ListItem>
                                            <Divider variant="middle" />
                                        </Box>
                                    ))}
                                </List>
                                <Button onClick={handleClickLogin} size="large" variant="contained" sx={{ py: 2, m: 2, borderRadius: 0 }}>
                                    login
                                </Button>
                            </Drawer>
                        </Box>

                        {/* desktop and tab navbar options */}
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    color="inherit"
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        display: "block",
                                    }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <IconButton sx={{ display: { xs: "none", md: "flex" } }} onClick={() => setDarkmode(!darkmode)} color="inherit">
                            {darkmode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <Button sx={{ mx: 1, display: { xs: "none", md: "flex" } }} color="inherit" onClick={handleClickLogin}>
                            login
                        </Button>
                        <Button sx={{ py: "19.5px", borderRadius: 0, display: { xs: "none", md: "flex" } }} variant="contained">
                            get trello for free
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Divider />
        </Box>
    );
};
export default NavBar;
