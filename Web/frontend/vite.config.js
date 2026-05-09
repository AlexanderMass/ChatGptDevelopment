import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/chatgpt-development/",
  plugins: [vue()],
});
