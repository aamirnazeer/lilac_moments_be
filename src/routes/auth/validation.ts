import { createInsertSchema } from "drizzle-zod";
import { users } from "../../db/schema/users";
import { z } from "zod";

export const usersInsertValidation = createInsertSchema(users).strict();

export const signInValidation = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict();

export const refreshTokenValidation = z
  .object({
    refreshToken: z.string(),
  })
  .strict();
