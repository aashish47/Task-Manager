import { createContext } from "react";
import { User } from "firebase/auth";

export const authContext = createContext<User | null>(null);
