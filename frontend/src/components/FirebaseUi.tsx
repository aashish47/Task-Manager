import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../config/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FirebaseUi = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const loadFirebaseUI = async () => {
            const uiConfig = {
                callbacks: {
                    signInSuccessWithAuthResult: function (authResult = auth, redirectUrl = "/") {
                        // User successfully signed in.
                        // Return type determines whether we continue the redirect automatically
                        // or whether we leave that to developer to handle.
                        console.log(authResult);
                        navigate(redirectUrl);
                        return false;
                    },
                },
                signInOptions: [
                    firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                    firebase.auth.GithubAuthProvider.PROVIDER_ID,
                ],
                signInSuccessUrl: "/",
            };

            let ui: firebaseui.auth.AuthUI | null = firebaseui.auth.AuthUI.getInstance();

            if (!ui) {
                ui = new firebaseui.auth.AuthUI(auth);
            }

            ui.start("#firebaseui-auth-container", uiConfig);
        };

        loadFirebaseUI();
    }, [navigate]);

    return <div id="firebaseui-auth-container" style={{ marginTop: "25vh" }}></div>;
};

export default FirebaseUi;
