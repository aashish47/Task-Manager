type TokenUpdateCallback = (newToken: string | null) => void;

let tokenUpdateCallback: TokenUpdateCallback | null = null;

export const setTokenUpdateCallback = (callback: TokenUpdateCallback) => {
    tokenUpdateCallback = callback;
};

export const updateToken = (newToken: string | null) => {
    if (tokenUpdateCallback) {
        tokenUpdateCallback(newToken);
    }
};
