import { ReactNode, useEffect, useState } from "react";
import { authContext } from "../hooks/useAuthContext";
import { auth } from "../config/firebase";
import { User } from "firebase/auth";

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    console.log("User:", user);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idToken = await user.getIdToken();
                const refreshToken = user.refreshToken;
                localStorage.setItem("ID_TOKEN", idToken);
                localStorage.setItem("REFRESH_TOKEN", refreshToken);
                setUser(user as User);
            } else {
                setUser(null);
            }
            setIsLoaded(true);
        });

        return () => unsubscribe();
    }, []);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
