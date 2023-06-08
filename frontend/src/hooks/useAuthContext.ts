import { useContext } from "react";
import { authContext } from "../contexts/authContext";

const useAuthContext = () => {
    const context = useContext(authContext);
    return context;
};

export default useAuthContext;
