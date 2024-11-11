import { SignUpData } from "./types";
import db from "../../db";
import { users } from "../../db/schema/users";
import { eq } from "drizzle-orm";

export const signUpController = async (data: SignUpData) => {
    await db
        .insert(users)
        .values({
            name: data.name,
            password: data.password,
            username: data.username,
        })
        .returning();
};

export const findUserByUsername = async (username: string) => {
    return db.select().from(users).where(eq(users.username, username));
};
