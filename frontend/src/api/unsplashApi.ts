import { getUnspalshApi } from "../helpers/unspalshHelper";

export const searchPhotos = async ({ query }: { query: string }) => {
    const api = getUnspalshApi();
    try {
        console.log(`Request : ${query}`);
        if (api) {
            const response = await api.search.getPhotos({ query, perPage: 30, orientation: "landscape" });

            return response;
        } else {
            return "";
        }
    } catch (error) {
        console.log("something went wrong!", error);
    }
};
