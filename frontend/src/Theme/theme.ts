import { createTheme } from "@mui/material";

const defaultTheme = createTheme({});

export const createCustomTheme = (darkmode: boolean) => {
    const textColor = darkmode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)";

    return createTheme({
        palette: {
            mode: darkmode ? "dark" : "light",
            text: {
                primary: textColor,
            },
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: darkmode ? "black" : "white",
                        color: textColor,
                        boxShadow: "none",
                    },
                },
            },
            MuiLink: {
                styleOverrides: {
                    root: {
                        textDecoration: "none",
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        transition: "transform 0.2s ease",
                        "&:hover": {
                            transform: "scale(1.05)",
                        },
                    },
                },
            },

            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        "&.Mui-selected": {
                            backgroundColor: defaultTheme.palette.primary.main,
                            color: "white",
                            "&:hover": {
                                backgroundColor: defaultTheme.palette.primary.main,
                            },
                        },
                    },
                },
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        minWidth: 30,
                        color: "inherit",
                    },
                },
            },
        },
    });
};
