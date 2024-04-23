import { QueryClient } from "@tanstack/react-query";

// Allows tRPC and any other react-query code to share the same query client
const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default reactQueryClient;
