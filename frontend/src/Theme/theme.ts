import { createTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const defaultTheme = createTheme({});

export const createCustomTheme = (darkmode: boolean) => {
    const textColor = darkmode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)";

    const secondary = darkmode ? { main: blueGrey[50] } : { main: blueGrey[900] };

    return createTheme({
        palette: {
            mode: darkmode ? "dark" : "light",
            text: {
                primary: textColor,
            },
            secondary,
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
