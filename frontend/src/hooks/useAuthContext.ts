import { createContext, useContext } from "react";
import { User } from "firebase/auth";

export const authContext = createContext<User | null>(null);

const useAuthContext = () => {
    const context = useContext(authContext);
    return context;
};

export default useAuthContext;
