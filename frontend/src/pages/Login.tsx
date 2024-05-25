import { Auth, getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { useEffect } from "react";
// import { auth } from "../firebase/firebase";

const Login = () => {
    const auth = getAuth();
    useEffect(() => {
        const loadFirebaseUI = async (auth: Auth) => {
            const uiConfig = {
                signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID, firebase.auth.GoogleAuthProvider.PROVIDER_ID],
                signInSuccessUrl: "/",
                signInFlow: "popup",
            };

            let ui: firebaseui.auth.AuthUI | null = firebaseui.auth.AuthUI.getInstance();

            if (!ui) {
                ui = new firebaseui.auth.AuthUI(auth);
            }

            ui.start("#firebaseui-auth-container", uiConfig);
        };

        loadFirebaseUI(auth);
    }, [auth]);

    return (
        <div
            id="firebaseui-auth-container"
            style={{ marginTop: "25vh" }}
        ></div>
    );
};

export default Login;
