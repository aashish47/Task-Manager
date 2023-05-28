import { useReducer, ReactNode, useEffect, useState } from "react";
import { AuthContextValue } from "../types/authTypes";
import { authContext } from "../constants/constant";
import { auth } from "../config/firebase";
import { authReducer } from "../reducers/authReducer";

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, { authUser: false });
    const [isLoaded, setIsLoaded] = useState(false);
    console.log("auth user:", state);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch({ type: "LOGIN" });
            } else {
                dispatch({ type: "LOGOUT" });
            }
            setIsLoaded(true);
        });

        // Cleanup the event listener when component unmounts
        return () => unsubscribe();
    }, []);

    if (!isLoaded) {
        // Render a loading indicator while the state is being loaded
        return <div>Loading...</div>;
    }

    const authContextValue: AuthContextValue = {
        ...state,
        dispatch,
    };

    return <authContext.Provider value={authContextValue}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
