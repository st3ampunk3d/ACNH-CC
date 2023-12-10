import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        login: resolve(__dirname, "src/auth/login.html"),
        logout: resolve(__dirname, "src/auth/logout.html"),
        events: resolve(__dirname, "src/events/index.html"),
        favorites: resolve(__dirname, "src/favorites/index.html"),
        creatures: resolve(__dirname, "src/creatures/index.html"),
        villagers: resolve(__dirname, "src/villagers/index.html"),
        collection: resolve(__dirname, "src/my-collection/index.html")
      },
    },
  },
});
