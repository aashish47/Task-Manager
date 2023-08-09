import { useQuery } from "@tanstack/react-query";
import { Auth, User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { getConfig } from "../api/api";
import { keys, setKeys } from "../config/config";
import { getFirebaseAuth, setFirebase } from "../firebase/firebase";
import { setRefreshApiKey } from "../helpers/refreshTokenHelper";
import { setUnsplashApi } from "../helpers/unspalshHelper";
import { authContext } from "../hooks/context/useAuthContext";
import useCreateUserMutation from "../hooks/user/useCreateUser";
import { ConfigType } from "../types/configTypes";

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const createUserMutation = useCreateUserMutation();

    const { data: configData } = useQuery<ConfigType>({ queryKey: ["Config"], queryFn: () => getConfig() });
    const [config, setConfig] = useState<ConfigType | undefined>(configData);
    const [auth, setAuth] = useState<Auth | undefined>();

    useEffect(() => {
        setConfig(configData);
        if (configData) {
            setKeys(configData);
            setFirebase(keys);
            setAuth(getFirebaseAuth());
            setUnsplashApi(keys.UNSPLASH_ACCESS_KEY);
            setRefreshApiKey(keys.FIREBASE_REFRESH_API_KEY);
        }
    }, [configData]);

    useEffect(() => {
        if (config && auth) {
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config, auth]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
