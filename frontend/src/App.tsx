import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import useAuthContext from "./hooks/useAuthContext";

const App = () => {
    const { authUser } = useAuthContext();
    return (
        <main>
            <BrowserRouter>
                <Routes>
                    <Route path="/welcome" element={authUser ? <Welcome /> : <Navigate to="/" />} />
                    <Route path="/" element={!authUser ? <Login /> : <Navigate to="/welcome" />} />
                </Routes>
            </BrowserRouter>
        </main>
    );
};

export default App;
