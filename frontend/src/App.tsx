import { CssBaseline, ThemeProvider } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Location, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { handleTokenExpireError } from "./api/api";
import AllBoards from "./components/home/AllBoards";
import Home from "./components/home/Home";
import NavBar from "./components/layout/NavBar";
import NavBarAuth from "./components/layout/NavBarAuth";
import WorkspaceBoardsWithHeading from "./components/workspace/WorkspaceBoardsWithHeading";
import WorkspaceGuests from "./components/workspace/WorkspaceGuests";
import WorkspaceHome from "./components/workspace/WorkspaceHome";
import WorkspaceMembers from "./components/workspace/WorkspaceMembers";
import WorkspaceMembersLayout from "./components/workspace/WorkspaceMembersLayout";
import WorkspaceRequests from "./components/workspace/WorkspaceRequests";
import WorkspaceSettings from "./components/workspace/WorkspaceSettings";
import useAuthContext from "./hooks/context/useAuthContext";
import useSocketContext from "./hooks/context/useSocketContext";
import Board from "./pages/Board";
import Landing from "./pages/Landing";
import LayoutHome from "./pages/LayoutHome";
import Login from "./pages/Login";
import WorkspaceLayout from "./pages/WorkpaceLayout";
import "./styles/App.css";
import { createCustomTheme } from "./theme/theme";

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
        if (!socket || !user) {
            return;
        }

        socket.on("connect", () => {
            console.log("Socket connected!");
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected!");
            socket.connect();
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

        socket.on("invalidateComments", (taskId) => {
            queryClient.invalidateQueries(["Comments", taskId]);
        });

        socket.on("error", (error) => {
            if (error === "auth/argument-error") {
                handleTokenExpireError();
            }
        });

        return () => {
            socket.off("notifications");
            socket.off("invalidateTasks");
            socket.off("invalidateBoards");
            socket.off("invalidateLists");
            socket.off("invalidateComments");
            socket.off("error");
            socket.disconnect();
        };
    }, [queryClient, socket, user]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <main>
                {user ? (
                    <NavBarAuth newNotifications={newNotifications} setNewNotifications={setNewNotifications} darkmode={darkmode} setDarkmode={setDarkmode} />
                ) : (
                    <NavBar />
                )}

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
                    <Route
                        path="/w/:wname/:wid"
                        element={
                            user ? (
                                <WorkspaceLayout>
                                    <WorkspaceBoardsWithHeading />
                                </WorkspaceLayout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/w/:wname/:wid/members"
                        element={
                            user ? (
                                <WorkspaceLayout>
                                    <WorkspaceMembersLayout>
                                        <WorkspaceMembers />
                                    </WorkspaceMembersLayout>
                                </WorkspaceLayout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/w/:wname/:wid/members/guests"
                        element={
                            user ? (
                                <WorkspaceLayout>
                                    <WorkspaceMembersLayout>
                                        <WorkspaceGuests />
                                    </WorkspaceMembersLayout>
                                </WorkspaceLayout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/w/:wname/:wid/members/requests"
                        element={
                            user ? (
                                <WorkspaceLayout>
                                    <WorkspaceMembersLayout>
                                        <WorkspaceRequests />
                                    </WorkspaceMembersLayout>
                                </WorkspaceLayout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/w/:wname/:wid/settings"
                        element={
                            user ? (
                                <WorkspaceLayout>
                                    <WorkspaceSettings />
                                </WorkspaceLayout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Routes>
            </main>
        </ThemeProvider>
    );
};

export default App;
