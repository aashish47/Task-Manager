import { createContext } from "react";
import { AuthContextValue } from "../types/authTypes";

export const authContext = createContext<AuthContextValue | undefined>(undefined);
