import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import { defineConfig } from "vite";
// https://vitejs.dev/config/

dotenv.config();
export default defineConfig({
    plugins: [react()],
});
