import { createApi } from "unsplash-js";

const api = createApi({
    accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

export const searchPhotos = async ({ query }: { query: string }) => {
    try {
        console.log(`Request : ${query}`);
        const response = await api.search.getPhotos({ query, perPage: 30, orientation: "landscape" });

        return response;
    } catch (error) {
        console.log("something went wrong!", error);
    }
};
