import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
import { StatusCodes } from "http-status-codes";

export const notFoundHandler = (_req: Request, res: Response) => {
    throw new CustomError(StatusCodes.NOT_FOUND, "route not found");
};
