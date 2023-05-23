import { useReducer, ReactNode, useEffect, useState } from "react";
import { AuthAction, AuthContextValue, AuthState } from "../types/authTypes";
import { authContext } from "../constants/constant";
import { auth } from "../firebase";

const reducerAuth = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return { authUser: true };
        case "LOGOUT":
            return { authUser: false };
        default:
            return state;
    }
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducerAuth, { authUser: false });
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
