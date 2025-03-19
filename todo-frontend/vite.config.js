import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// trigger redeploy
export default defineConfig({
  base: "/ZenTasker-Todo/",
  plugins: [react()],
});
