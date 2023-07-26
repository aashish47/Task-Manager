import { User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { authContext } from "../hooks/context/useAuthContext";
import useCreateUserMutation from "../hooks/user/useCreateUser";

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const createUserMutation = useCreateUserMutation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const { displayName: name, email, uid } = user;
                try {
                    const idToken = await user.getIdToken();
                    const refreshToken = user.refreshToken;
                    localStorage.setItem("ID_TOKEN", idToken);
                    localStorage.setItem("REFRESH_TOKEN", refreshToken);
                    setUser(user as User);
                    if (name && email && uid) {
                        await createUserMutation.mutateAsync({ uid, name, email });
                    }
                } catch (error) {
                    console.log("error occured", error);
                }
            } else {
                setUser(null);
            }
            setIsLoaded(true);
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
