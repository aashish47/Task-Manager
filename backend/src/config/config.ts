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

export const config = {
    server,
    mongo,
};
