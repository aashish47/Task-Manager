import { AuthAction, AuthState } from "../types/authTypes";

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return { authUser: true };
        case "LOGOUT":
            return { authUser: false };
        default:
            return state;
    }
};
