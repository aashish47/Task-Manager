export interface AuthState {
    authUser: boolean;
}

export interface AuthAction {
    type: string;
}

export interface AuthContextValue extends AuthState {
    dispatch: React.Dispatch<AuthAction>;
}
