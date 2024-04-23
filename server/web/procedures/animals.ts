import { animalDatastore, upsertAnimalSchema } from "server/animal-datastore";
import { publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

// Design Pattern: How to use Zod and tRPC to create an Upsert endpoint instead of a create and an update endpoint
export const upsert = publicProcedure
  .input(upsertAnimalSchema)
  .mutation(async ({ input }) => {
    let animal;

    if (input.id) {
      animal = animalDatastore.readAnimal(input.id);

      if (!animal) {
        // With Procedures, always throw TRPCErrors. TS provides auto-complete for all the `code` values
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Animal not found",
        });
      }

      // We know these inputs exist because of `.input(upsertAnimalSchema)` on line 6
      const updatedAnimal = animalDatastore.updateAnimal(input.id, input.name);

      /*
        Note: I recommend always returning an object with tRPC mutations because `.updateAnimal()` can return undefined
        and tRPC can never return undefined as a response.
      */
      return { animal: updatedAnimal };
    }

    animal = animalDatastore.createAnimal(input.name);

    return { animal };
  });

export const fetchAll = publicProcedure.query(async () => {
  return animalDatastore.readAnimals();
});

export default {
  upsert,
  fetchAll,
};
