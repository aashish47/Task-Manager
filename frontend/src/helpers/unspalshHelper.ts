import { createApi } from "unsplash-js";

let api: any;

export const setUnsplashApi = (UNSPLASH_ACCESS_KEY: string) => {
    api = createApi({
        accessKey: UNSPLASH_ACCESS_KEY,
    });
};

export const getUnspalshApi = () => {
    return api;
};
