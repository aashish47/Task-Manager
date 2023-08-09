import { ConfigType } from "../types/configTypes";

export let keys: ConfigType;

export const setKeys = (config: ConfigType) => {
    keys = {
        FIREBASE_API_KEY: config.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: config.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: config.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: config.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: config.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: config.FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: config.FIREBASE_MEASUREMENT_ID,
        FIREBASE_REFRESH_API_KEY: config.FIREBASE_REFRESH_API_KEY,
        UNSPLASH_ACCESS_KEY: config.UNSPLASH_ACCESS_KEY,
    };
};
