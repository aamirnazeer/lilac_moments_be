import { integer, pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    uuid: uuid().primaryKey().defaultRandom(),
    id: integer().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    password: varchar().notNull(),
    username: varchar().notNull().unique(),
});
