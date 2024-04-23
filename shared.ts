/**
 * Exports shared Types and Zod Schemas between frontend and backend
 */

export { upsertAnimalSchema } from "server/animal-datastore";
export type { TRPCRouter } from "./server/web/express";

export type { AnimalSchema } from "./server/animal-datastore";
