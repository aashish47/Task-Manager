import { createTheme } from "@mui/material";
const defaultTheme = createTheme({});

export const createCustomTheme = (darkmode: boolean) => {
    return createTheme({
        palette: {
            mode: darkmode ? "dark" : "light",
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: darkmode ? "black" : "white",
                        color: darkmode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
                    },
                },
            },

            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: darkmode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                    },
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        color: darkmode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
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
