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

const App = () => {
    const [darkmode, setDarkmode] = useState(false);
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
                        <Route path="/" element={!user ? <Landing /> : <Home />} />
                    </Routes>
                </BrowserRouter>
            </main>
        </ThemeProvider>
    );
};

export default App;
