import { AnimalSchema } from "shared";
import { getFormFieldError, trpc } from "./trpc";
import { useEffect, useState } from "react";
import { CreateAnimalInput } from "../server/animal-datastore";

export function Animals() {
  const [updatingAnimal, setUpdatingAnimal] = useState<
    AnimalSchema | CreateAnimalInput | undefined
  >(undefined); // Used to store the animal we're updating

  const animals = trpc.animals.fetchAll.useQuery(); // Fetches all animals from the backend

  return (
    <>
      <h1>Animals</h1>
      <h4>
        Recommendations: Create an animal, then update it. Try upserting an
        animal with no name or where the name exceeds 100 characters.{" "}
      </h4>
      <button
        onClick={() => {
          setUpdatingAnimal({ name: "" });
        }}
      >
        Create new animal
      </button>
      <AnimalsList
        animals={animals.isLoading ? [] : animals.data}
        setUpdatingAnimal={setUpdatingAnimal}
      />
      {updatingAnimal ? (
        <UpsertAnimalForm
          animal={updatingAnimal}
          refetch={animals.refetch}
          setUpdatingAnimal={setUpdatingAnimal}
        />
      ) : null}
    </>
  );
}

/**
 * Notice: We never read the animals from state so even when we're editing the animals, this is not reflected in the UI here.
 * We're solely fetching this from the backend, which means if we Edit an animal and refetch the data, we've successfully simulated a tRPC Mutation where the data is updated in the backend and then refetched.
 */
function AnimalsList({
  animals,
  setUpdatingAnimal,
}: {
  animals: AnimalSchema[];
  setUpdatingAnimal: (animal: AnimalSchema) => void;
}) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ padding: 4 }}>Name</th>
            <th style={{ padding: 4 }}>Created At</th>
            <th style={{ padding: 4 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id}>
              <td style={{ padding: 4 }}>{animal.name}</td>
              <td style={{ padding: 4 }}>{animal.createdAt}</td>
              <td style={{ padding: 4 }}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setUpdatingAnimal(animal);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
    </div>
  );
}

function UpsertAnimalForm({
  animal,
  refetch,
  setUpdatingAnimal,
}: {
  animal: AnimalSchema | CreateAnimalInput;
  refetch: () => void;
  setUpdatingAnimal: (animal: undefined) => void;
}) {
  const [name, setName] = useState(animal ? animal.name : "");

  const upsertMutation = trpc.animals.upsert.useMutation();

  useEffect(() => {
    if (upsertMutation.isSuccess) {
      refetch();
      setUpdatingAnimal(undefined);
    }
  }, [upsertMutation.isSuccess]);

  const handleSubmit = () => {
    // Design pattern, handle differents between `Create` and `Update` before submitting the tRPC Upsert mutation
    const payload: AnimalSchema | CreateAnimalInput = { name };
    if ((animal as AnimalSchema)?.id) {
      (payload as AnimalSchema).id = (animal as AnimalSchema).id;
    }

    upsertMutation.mutate(payload);
  };

  const isUpdating = (animal as AnimalSchema)?.id;

  return (
    <div>
      <h2>{isUpdating ? `Update ${animal.name}` : "Create New Animal"}</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            defaultValue={animal ? animal.name : ""}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <div style={{ color: "red", fontWeight: "bold" }}>
            {/* 
              Design pattern: show validation errors on the frontend for each input in this way

              You can test this is working by submitting an animal with no name.
            */}
            {upsertMutation.error?.message
              ? getFormFieldError(
                  JSON.parse(upsertMutation.error.message),
                  "name"
                )
              : ""}
          </div>
        </label>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {animal ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
