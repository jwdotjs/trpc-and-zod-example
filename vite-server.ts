import { createServer } from "vite";
import config from "./vite.server.config";

(async () => {
  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    ...config,
    configFile: false,
  });
  await server.listen();

  server.printUrls();
})();
