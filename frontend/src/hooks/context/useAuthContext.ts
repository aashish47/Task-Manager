import { User } from "firebase/auth";
import { createContext, useContext } from "react";

export const authContext = createContext<User | null>(null);

const useAuthContext = () => {
    const context = useContext(authContext);
    return context;
};

export default useAuthContext;
