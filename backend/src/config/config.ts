import dotenv from "dotenv";
dotenv.config();

const port = process.env.SERVER_PORT;
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

const server = {
    port,
};

const mongo = {
    url: `mongodb+srv://${username}:${password}@cluster0.xojd4me.mongodb.net/Task_Manager`,
};

const firebaseConfig = {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MEASUREMENT_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    FIREBASE_REFRESH_API_KEY: process.env.FIREBASE_REFRESH_API_KEY,
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
};

export const config = {
    server,
    mongo,
    firebaseConfig,
};
