import { Routes, Route, Navigate, useLocation, Location } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./components/Home";
import Landing from "./pages/Landing";
import NavBar from "./components/NavBar";
import NavBarAuth from "./components/NavBarAuth";
import { CssBaseline, Divider, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { createCustomTheme } from "./Theme/theme";
import WorkspaceHome from "./components/WorkspaceHome";
import LayoutHome from "./pages/LayoutHome";
import AllBoards from "./components/AllBoards";
import useAuthContext from "./hooks/useAuthContext";
import Board from "./pages/Board";
import "./styles/App.css";
import { useQueryClient } from "@tanstack/react-query";
import useSocketContext from "./hooks/useSocketContext";

const checkBoardPage = (location: Location) => {
    const isBoardPage = location.pathname.startsWith("/b");
    const rootElement = document.querySelector("body");
    if (isBoardPage && rootElement) {
        rootElement.classList.add("overflow-hidden");
    } else {
        rootElement?.classList.remove("overflow-hidden");
    }
};

const App = () => {
    const [darkmode, setDarkmode] = useState(true);
    const [newNotifications, setNewNotifications] = useState(0);
    const user = useAuthContext();
    const theme = createCustomTheme(darkmode);
    const location = useLocation();
    const queryClient = useQueryClient();
    const socket = useSocketContext();

    useEffect(() => {
        checkBoardPage(location);
    }, [location]);

    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.on("connect", () => {
            console.log("Socket connected!");
        });

        socket.on("notifications", (totalNotifications) => {
            queryClient.invalidateQueries(["Notifications"]);
            setNewNotifications(totalNotifications);
        });

        socket.on("invalidateBoards", () => {
            queryClient.invalidateQueries(["Boards"]);
        });

        socket.on("invalidateLists", (boardId) => {
            queryClient.invalidateQueries(["Lists", boardId]);
        });

        socket.on("invalidateTasks", (boardId) => {
            queryClient.invalidateQueries(["Tasks", boardId]);
        });

        return () => {
            socket.off("notifications");
            socket.off("invalidateTasks");
            socket.off("invalidateTasksAndLists");
            socket.disconnect();
        };
    }, [queryClient, socket]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                {user ? (
                    <NavBarAuth newNotifications={newNotifications} setNewNotifications={setNewNotifications} darkmode={darkmode} setDarkmode={setDarkmode} />
                ) : (
                    <NavBar />
                )}
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
                                    <AllBoards />
                                </LayoutHome>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route path="/b/:bname/:bid" element={user ? <Board /> : <Navigate to="/login" />} />
                </Routes>
            </main>
        </ThemeProvider>
    );
};

export default App;
