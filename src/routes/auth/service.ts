import { SignIntype, UserInsertType } from "./types";
import {
  findUserByUsername,
  signUpController,
  storeRefreshToken,
  signOutController,
  getRefreshToken,
  findUserByUserId,
  findTokenByUserId,
} from "./controller";
import { checkHashedPassword, createHashedPassword, createToken } from "./helper";
import { CustomError } from "../../utils/CustomError";
import { StatusCodes } from "http-status-codes";

export const signUpService = async (data: UserInsertType) => {
  const [existingUser] = await findUserByUsername(data.username);
  if (existingUser) {
    throw new CustomError(StatusCodes.CONFLICT, "username exists already");
  }
  data.password = createHashedPassword(data.password);
  const [newUser] = await signUpController(data);
  const accessToken = createToken(newUser, "access", "auth");
  const refreshToken = createToken(newUser, "refresh", "auth");
  await storeRefreshToken(refreshToken, newUser.id);
  return { accessToken, refreshToken };
};

export const signInService = async (data: SignIntype) => {
  const [existingUser] = await findUserByUsername(data.username);
  if (!existingUser) throw new CustomError(StatusCodes.UNAUTHORIZED, "cannot find username");
  const passwordMatch = checkHashedPassword(data.password, existingUser.password);
  if (!passwordMatch) throw new CustomError(StatusCodes.UNAUTHORIZED, "credentials error");

  const accessToken = createToken(existingUser, "access", "auth");
  const refreshToken = createToken(existingUser, "refresh", "auth");
  await storeRefreshToken(refreshToken, existingUser.id);
  return { accessToken, refreshToken };
};

export const signOutService = async (token: string) => {
  if (!token) throw new CustomError(StatusCodes.FORBIDDEN, "logged out already");
  const [user] = await findTokenByUserId(token);
  await signOutController(user.id);
};

export const refreshTokenService = async (token: string) => {
  const [refreshToken] = await getRefreshToken(token);
  if (!refreshToken) throw new CustomError(StatusCodes.UNAUTHORIZED, "credentials error");
  const [existingUser] = await findUserByUserId(refreshToken.user_id);
  if (!existingUser) throw new CustomError(StatusCodes.UNAUTHORIZED, "credentials error");
  const accessToken = createToken(existingUser, "access", "refresh");
  return { accessToken };
};
