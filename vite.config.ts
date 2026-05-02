import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), commonjs(), tailwindcss()],
  optimizeDeps: {
    include: ["nearley", "moo"],
  },
  test: {
    environment: "jsdom",
  },
});
