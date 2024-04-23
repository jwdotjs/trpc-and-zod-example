// Config file for the backend

import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";
import path from "path";

export default defineConfig({
  // ...vite configures
  server: {
    // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
    port: 3000,
    watch: {
      ignored: [],
    },
  },
  build: {
    // manifest: 'web_manifest.json',
    target: "esnext",
    outDir: "./dist/server",
    emptyOutDir: true, // cleanup previous builds
    sourcemap: true, // we want to debug our code in production
  },
  root: ".",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],

    alias: [
      { find: "shared", replacement: path.resolve(__dirname, "shared.ts") },
      { find: "server", replacement: path.resolve(__dirname, "/server") },
    ],
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "./server/index.ts",

      // the name of named export of you app from the appPath file. **Must match server/index.ts export**
      exportName: "expressApp",

      // Optional, default: 'esbuild'
      // The TypeScript compiler you want to use
      // by default this plugin is using vite default ts compiler which is esbuild
      // 'swc' compiler is supported to use as well for frameworks
      // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
      // you need to INSTALL `@swc/core` as dev dependency if you want to use swc
      tsCompiler: "esbuild",

      // Optional, default: {
      // jsc: {
      //   target: 'es2019',
      //   parser: {
      //     syntax: 'typescript',
      //     decorators: true
      //   },
      //  transform: {
      //     legacyDecorator: true,
      //     decoratorMetadata: true
      //   }
      // }
      // }
      // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
      swcOptions: {},
    }),
  ],
  optimizeDeps: {
    exclude: ["expressApp"],
  },
});
