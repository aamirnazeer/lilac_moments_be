import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../utils/CustomError";
import { StatusCodes } from "http-status-codes";
import { readToken } from "./helper";
import { CurrentUserType } from "./types";

declare global {
  namespace Express {
    interface Request {
      currentUser: CurrentUserType;
    }
  }
}

export const validateRequestMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;
  if (!accessToken) throw new CustomError(StatusCodes.UNAUTHORIZED, "unauthorised");
  try {
    const user = readToken(accessToken, "access") as CurrentUserType;
    req.currentUser = { name: user.name, id: user.id, origin: user.origin, uuid: user.uuid, username: user.username };
  } catch (err: any) {
    throw new CustomError(StatusCodes.FORBIDDEN, err.message);
  }
  next();
};

export const validateRefreshTokenMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) throw new CustomError(StatusCodes.UNAUTHORIZED, "unauthorised");
  try {
    readToken(refreshToken, "refresh");
  } catch (err: any) {
    throw new CustomError(StatusCodes.FORBIDDEN, err.message);
  }
  next();
};
