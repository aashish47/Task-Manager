import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import useAuthContext from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import NavBar from "./components/NavBar";
import NavBarAuth from "./components/NavBarAuth";
import { ThemeProvider, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const defaultTheme = createTheme({});

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                text: {
                    "&:hover": {
                        backgroundColor: grey[200],
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: grey[200],
                    },
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    color: "rgba(0, 0, 0, 0.7)",
                    "&:hover": {
                        backgroundColor: grey[200],
                    },

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

const App = () => {
    const { authUser } = useAuthContext();
    return (
        <main>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    {authUser ? <NavBarAuth /> : <NavBar />}
                    <Routes>
                        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
                        <Route path="/" element={!authUser ? <Landing /> : <Home />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </main>
    );
};

export default App;
