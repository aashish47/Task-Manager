import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AuthContextProvider from "./contexts/AuthContextProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
