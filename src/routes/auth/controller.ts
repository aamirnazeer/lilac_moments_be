import { UserInsertType } from "./types";
import db from "../../db";
import { users } from "../../db/schema/users";
import { eq } from "drizzle-orm";
import { refreshTokens } from "../../db/schema/refreshTokens";

export const signUpController = async (data: UserInsertType) => {
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

export const findUserByUserId = async (user_id: number) => {
  return db.select().from(users).where(eq(users.id, user_id));
};

export const storeRefreshToken = async (token: string, id: number) => {
  return db.insert(refreshTokens).values({ refresh_token: token, user_id: id });
};

export const getRefreshToken = async (token: string) => {
  return db.select().from(refreshTokens).where(eq(refreshTokens.refresh_token, token));
};

export const signOutController = async (id: number) => {
  db.delete(refreshTokens).where(eq(refreshTokens.id, id));
};

export const findTokenByUserId = async (token: string) => {
  return db.select().from(refreshTokens).where(eq(refreshTokens.refresh_token, token));
};
