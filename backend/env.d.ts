declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production" | "test";
            SERVER_PORT: string;
            MONGO_USERNAME: string;
            MONGO_PASSWORD: string;
            SERVICE_ACCOUNT_KEY: string;
        }
    }
}

export {};
