import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./components/Home";
import Landing from "./pages/Landing";
import NavBar from "./components/NavBar";
import NavBarAuth from "./components/NavBarAuth";
import { CssBaseline, Divider, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { createCustomTheme } from "./Theme/theme";
import WorkspaceHome from "./components/WorkspaceHome";
import LayoutHome from "./pages/LayoutHome";
import BoardsUsers from "./components/BoardsUser";
import useAuthContext from "./hooks/useAuthContext";
import Board from "./pages/Board";

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
                    <Divider />
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
                            path="/w/:wname/:wid/home"
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
                        <Route
                            path="/u/:user/boards"
                            element={
                                user ? (
                                    <LayoutHome>
                                        <BoardsUsers />
                                    </LayoutHome>
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route path="/b/:bname/:bid" element={user ? <Board /> : <Navigate to="/login" />} />
                    </Routes>
                </BrowserRouter>
            </main>
        </ThemeProvider>
    );
};

export default App;
