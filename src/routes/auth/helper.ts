import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CurrentUserType, TokenOriginTypes, TokenTypes, UserSelectType } from "./types";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../core/env";

export const createHashedPassword = (password: string) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const checkHashedPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export const createToken = (data: UserSelectType, type: TokenTypes, origin: TokenOriginTypes) => {
  const payload: CurrentUserType = {
    uuid: data.uuid,
    id: data.id,
    name: data.name,
    username: data.username,
    origin: origin,
  };
  const secret = type === "access" ? ACCESS_TOKEN_SECRET! : REFRESH_TOKEN_SECRET!;
  const expiresIn = type === "access" ? 10 * 60 : 24 * 60 * 60;

  return jwt.sign(payload, secret, { expiresIn });
};

export const readToken = (token: string, type: TokenTypes): string | jwt.JwtPayload | CurrentUserType => {
  const secret = type === "access" ? ACCESS_TOKEN_SECRET! : REFRESH_TOKEN_SECRET!;
  return jwt.verify(token, secret) as CurrentUserType;
};
