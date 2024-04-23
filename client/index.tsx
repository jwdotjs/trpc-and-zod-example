import "vite/modulepreload-polyfill";

import { QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Router } from "@/Router";
import reactQueryClient from "@/utils/react-query-client";

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={reactQueryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
