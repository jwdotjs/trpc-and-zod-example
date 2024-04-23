import { createTRPCReact } from "@trpc/react-query";

import type { TRPCRouter } from "shared";
import type { ZodIssue } from "zod";

// Uses the TRPCRouter type from shared.ts to scaffold react-query definitions, saving a ton of time!
export const trpc = createTRPCReact<TRPCRouter>();

// Helper functions for working with Zod errors from a tRPC mutation response
export function hasFormFieldError(
  zodErrors: ZodIssue[],
  field: string
): boolean {
  return !!zodErrors?.find((error: ZodIssue) => error.path.includes(field));
}

// Helper functions for working with Zod errors from a tRPC mutation response
export function getFormFieldError(
  zodErrors: ZodIssue[],
  field: string,
  defaultValue?: string
): null | string {
  return (
    zodErrors?.find((error: ZodIssue) => error.path.includes(field))?.message ||
    defaultValue ||
    null
  );
}
