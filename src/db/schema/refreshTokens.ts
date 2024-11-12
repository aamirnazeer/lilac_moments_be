import { integer, pgTable, varchar, uuid, boolean, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const refreshTokens = pgTable("refresh_tokens", {
  uuid: uuid().primaryKey().defaultRandom(),
  id: integer().generatedAlwaysAsIdentity(),
  refresh_token: varchar().notNull(),
  user_id: integer().references(() => users.id),
  is_deleted: boolean().default(false),
  created_at: timestamp({ mode: "date", precision: 3 }).defaultNow(),
  updated_at: timestamp({ mode: "date", precision: 3 }).$onUpdate(() => new Date()),
});
