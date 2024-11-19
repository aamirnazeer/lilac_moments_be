import { users } from "../../db/schema/users";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { z } from "zod";
import { signInValidation } from "./validation";

export type UserInsertType = InferInsertModel<typeof users>;
export type UserSelectType = InferSelectModel<typeof users>;

export type TokenTypes = "access" | "refresh";

export type TokenOriginTypes = "auth" | "refresh";

export type SignIntype = z.infer<typeof signInValidation>;

export type CurrentUserType = {
  uuid: string;
  id: number;
  name: string;
  username: string;
  origin: string;
};
