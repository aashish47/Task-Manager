let refreshApiKey: string;

export const setRefreshApiKey = (FIREBASE_REFRESH_API_KEY: string) => {
    refreshApiKey = FIREBASE_REFRESH_API_KEY;
};

export const getRefreshApiKey = () => {
    return refreshApiKey;
};
