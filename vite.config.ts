import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
  plugins: [react(), commonjs()],
  optimizeDeps: {
    include: ["nearley", "moo"],
  },
  test: {
    environment: "jsdom",
  },
});
