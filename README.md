# tRPC and Zod

This repository showcases some simple Design Patterns to use with tRPC and Zod to cut down on a lot of boilerplate code.

Specific callouts:

1. Simplicity of fetching and upserting can be found in [Animals.tsx](./client/Animals.tsx), [animal-datastore.ts](./server/animal-datastore.ts), and [procedures/animals.ts](./server/web/procedures/animals.ts)
1. Simplicity of server-side data validation can be found in [animal-datastore.ts](./server/animal-datastore.ts), and [procedures/animals.ts](./server/web/procedures/animals.ts)
1. Simplicity of client-side display of form errors from a failed tRPC mutation request can be found in [Animals.tsx](./client/Animals.tsx)

## Initial Setup

`npm i --legacy-peer-deps`

*We need `--legacy-peer-deps` because `@trpc/react-query` has a peer dependency range for `react-dom` that needs to be updated, however this demo still works*

## Running Locally

In two terminal windows run:

- `npm run backend`
- `npm run frontend`
