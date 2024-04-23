import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { httpBatchLink } from "@trpc/client";

import { trpc } from "@/trpc";
import reactQueryClient from "@/utils/react-query-client";
import { Animals } from "./Animals";

export function Router() {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `http://localhost:3000/trpc`, // Defines backend endpoint we need to hit to make tRPC calls
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include", // This demo doesn't use Cookies, but this is how you include cookies if you need them
            });
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={reactQueryClient}>
      <Routes>
        <Route path="/" element={<Animals />} />
      </Routes>
    </trpc.Provider>
  );
}
