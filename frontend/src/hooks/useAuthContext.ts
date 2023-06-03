import { useContext } from "react";
import { authContext } from "../contexts/authContext";

const useAuthContext = () => {
    const context = useContext(authContext);
    if (!context) {
        throw Error("Context need to be used inside provider");
    }

    return context;
};

export default useAuthContext;
