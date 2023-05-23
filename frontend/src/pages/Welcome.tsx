import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.log("Error signing out:", error);
            });
    };
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Welcome;
