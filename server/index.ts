/**
 * This file is used to boot different types of backend servers based on the ENV vars specified.
 */

// Note: Due to how vite-plugin-node works, we must use `export { expressApp }` and ensure the naming matches
// See vite.server.config.ts for more info.

export { expressApp } from "server/web/express";
