import express from "express";
import path from "path";
import { fileURLToPath, format } from "url";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext, router } from "./trpc";

import animalProcedures from "./procedures/animals";

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// By adding these lines of code, on the frontend we can call `trpc.animals.upsert()` and `trpc.animals.fetchAll()`
export const trpcRouter = router({
  animals: router(animalProcedures),
});
export type TRPCRouter = typeof trpcRouter;

app.use(cors({ origin: true, credentials: true }));
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
    createContext,
  })
);

// The "catchall" handler: for any request that doesn't match one above
app.use((req, res, next) => {
  if (!(req.path.includes(".css") || req.path.includes(".js"))) {
    const redirectUrl = format({
      protocol: "http",
      hostname: "localhost",
      port: "4000", // Frontend port, defined in vite.config.ts
      pathname: req.path,
      query: req.query as Record<string, any>,
    });
    return res.redirect(redirectUrl);
  }
  return next();
});

const PORT = 3000; // Backend port

app.listen(PORT);
console.log(`Server listening on ${PORT}`);

export const expressApp = app;
