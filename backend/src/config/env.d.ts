declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SERVER_PORT: number;
            MONGO_USERNAME: string;
            MONGO_PASSWORD: string;
        }
    }
}

export {};
