import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import useAuthContext from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import NavBar from "./components/NavBar";
import NavBarAuth from "./components/NavBarAuth";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { createCustomTheme } from "./Theme/theme";
import WorkspaceHome from "./pages/WorkspaceHome";
import LayoutHome from "./pages/LayoutHome";

const App = () => {
    const [darkmode, setDarkmode] = useState(true);
    const user = useAuthContext();
    const theme = createCustomTheme(darkmode);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <BrowserRouter>
                    {user ? <NavBarAuth darkmode={darkmode} setDarkmode={setDarkmode} /> : <NavBar />}
                    <Routes>
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                        <Route
                            path="/"
                            element={
                                user ? (
                                    <LayoutHome>
                                        <Home />
                                    </LayoutHome>
                                ) : (
                                    <Landing />
                                )
                            }
                        />
                        <Route
                            path="/w/:wname/:id/home"
                            element={
                                user ? (
                                    <LayoutHome>
                                        <WorkspaceHome />
                                    </LayoutHome>
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </main>
        </ThemeProvider>
    );
};

export default App;
