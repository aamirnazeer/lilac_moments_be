import { createInsertSchema } from "drizzle-zod";
import { users } from "../../db/schema/users";

export const usersInsertValidation = createInsertSchema(users).strict();
