/**
 * This file mocks out a datastore so that the focus can be on tRPC and Zod.
 *
 * In Production, you'd want to use real datastores like Postgres, etc.
 */

import crypto from "crypto";
import z from "zod";

// **Design Pattern**
// 1. When building types for an Entity, start with the Create schema
export const createAnimalSchema = z.object({
  name: z.string().min(1).max(100),
});
export type CreateAnimalInput = z.infer<typeof createAnimalSchema>;

// 2. Next add the required `id` for the Update Schema and use `.merge()` to combine the two
export const updateAnimalSchema = z
  .object({
    id: z.string(),
  })
  .merge(createAnimalSchema);
export type UpdateAnimalSchema = z.infer<typeof updateAnimalSchema>;

// 3. Optional: If we have an `upsert` tRPC endpoint, we can add a schema for that as well where the `id` is optional
export const upsertAnimalSchema = z
  .object({
    id: z.string().optional(),
  })
  .merge(createAnimalSchema);
export type UpsertAnimalSchema = z.infer<typeof upsertAnimalSchema>;

// 4. Merge the UpdateSchema with any additional automatically created or dynamically applied attributes
export type AnimalSchema = UpdateAnimalSchema & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export const animalDatastore = {
  animals: [
    {
      id: crypto.randomUUID(),
      name: "Cat",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "Dog",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "Bird",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "Fish",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "Lizard",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],

  readAnimals(): AnimalSchema[] {
    return this.animals;
  },

  readAnimal(id: string): AnimalSchema | undefined {
    return this.animals.find((animal) => animal.id === id);
  },

  createAnimal(name: string): AnimalSchema {
    const newAnimal = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.animals.push(newAnimal);

    return newAnimal;
  },

  deleteAnimal(id: string): void {
    const index = this.animals.findIndex((animal) => animal.id === id);
    if (index !== -1) {
      this.animals.splice(index, 1);
    }
  },

  updateAnimal(id: string, name: string): AnimalSchema | undefined {
    const index = this.animals.findIndex((animal) => animal.id === id);
    if (index === -1) {
      return;
    }

    // Update the record
    this.animals[index].name = name;

    return this.animals[index];
  },
};
