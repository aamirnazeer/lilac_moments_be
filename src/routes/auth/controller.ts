import { SignUpData } from "./types";
import db from "../../db";
import { users } from "../../db/schema/users";
import { eq } from "drizzle-orm";
import { refreshTokens } from "../../db/schema/refreshTokens";

export const signUpController = async (data: SignUpData) => {
  return db
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

export const storeRefreshToken = async (token: string, id: number) => {
  return db.insert(refreshTokens).values({ refresh_token: token, user_id: id });
};
