import { integer, pgTable, varchar, uuid, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  uuid: uuid().primaryKey().defaultRandom(),
  id: integer().generatedAlwaysAsIdentity().unique(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar().notNull(),
  username: varchar().notNull().unique(),
  is_deleted: boolean().default(false),
  created_at: timestamp({ mode: "date", precision: 3 }).defaultNow(),
  updated_at: timestamp({ mode: "date", precision: 3 }).$onUpdate(() => new Date()),
});
