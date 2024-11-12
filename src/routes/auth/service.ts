import { UserInsertType } from "./types";
import { findUserByUsername, signUpController, storeRefreshToken } from "./controller";
import { createHashedPassword, createToken } from "./helper";
import { CustomError } from "../../utils/CustomError";
import { StatusCodes } from "http-status-codes";

export const signUpService = async (data: UserInsertType) => {
  const existingUser = await findUserByUsername(data.username);
  if (existingUser.length) {
    throw new CustomError(StatusCodes.CONFLICT, "username exists already");
  }
  data.password = createHashedPassword(data.password);
  const [newUser] = await signUpController(data);
  const accessToken = createToken(newUser, "access", "auth");
  const refreshToken = createToken(newUser, "refresh", "auth");
  await storeRefreshToken(refreshToken, newUser.id);
  return { accessToken, refreshToken };
};
