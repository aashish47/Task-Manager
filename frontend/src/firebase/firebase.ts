import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { ConfigType } from "../types/configTypes";

let auth: Auth;

export const setFirebase = (keys: ConfigType) => {
    const firebaseConfig = {
        apiKey: keys.FIREBASE_API_KEY,
        authDomain: keys.FIREBASE_AUTH_DOMAIN,
        projectId: keys.FIREBASE_PROJECT_ID,
        storageBucket: keys.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: keys.FIREBASE_MESSAGING_SENDER_ID,
        appId: keys.FIREBASE_APP_ID,
        measurementId: keys.FIREBASE_MEASUREMENT_ID,
    };

    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
};

export const getFirebaseAuth = () => {
    return auth;
};
