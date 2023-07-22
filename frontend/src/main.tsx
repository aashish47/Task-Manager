import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { enGB } from "date-fns/locale";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import AuthContextProvider from "./contexts/AuthContextProvider.tsx";
import SocketContextProvider from "./contexts/SocketContextProvider.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <SocketContextProvider>
                    <BrowserRouter>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                            <App />
                        </LocalizationProvider>
                    </BrowserRouter>
                </SocketContextProvider>
            </AuthContextProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
