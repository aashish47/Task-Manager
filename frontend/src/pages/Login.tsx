import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const loadFirebaseUI = async () => {
            const uiConfig = {
                signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
                callbacks: {
                    signInSuccessWithAuthResult: () => {
                        // Custom logic after successful sign-in

                        navigate("/welcome");
                        return false; // Prevent default redirect behavior
                    },
                },
            };

            let ui: firebaseui.auth.AuthUI | null = firebaseui.auth.AuthUI.getInstance();

            if (!ui) {
                ui = new firebaseui.auth.AuthUI(auth);
            }

            ui.start("#firebaseui-auth-container", uiConfig);
        };

        loadFirebaseUI();
    }, [navigate]);

    return <div id="firebaseui-auth-container"></div>;
};

export default Login;
