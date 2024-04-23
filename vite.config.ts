// Config file for the frontend

import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint2";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __DEV__: "true",
    "process.env": {},
  },
  root: "./client",
  server: {
    port: 4000,
    strictPort: true, // don't try to find another port if 4000 is taken
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  build: {
    manifest: "web_manifest.json",
    target: "es2018",
    outDir: "../dist/server/public",
    emptyOutDir: true, // cleanup previous builds
    sourcemap: true, // We want to debug our code in production
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: [
      {
        find: "react",
        replacement: path.resolve(__dirname, "node_modules/react"),
      },
      {
        find: "react-dom",
        replacement: path.resolve(__dirname, "node_modules/react-dom"),
      },
      {
        find: "shared",
        replacement: path.resolve(__dirname, "shared.ts"),
      },
      { find: "@", replacement: path.resolve(__dirname, "client") },
    ],
  },
  plugins: [
    viteCommonjs(),
    react(),
    eslint({
      cache: true,
    }),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "window",
      },
      loader: {
        ".js": "jsx",
      },
      resolveExtensions: [".js"],
      plugins: [],
    },
  },
});
