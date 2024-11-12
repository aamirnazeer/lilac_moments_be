import { users } from "../../db/schema/users";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type UserInsertType = InferInsertModel<typeof users>;
export type UserSelectType = InferSelectModel<typeof users>;

export type TokenTypes = "access" | "refresh";

export type TokenOriginTypes = "auth" | "refresh";
