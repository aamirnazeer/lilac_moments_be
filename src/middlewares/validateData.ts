import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../utils/CustomError";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid data", errorMessages);
      } else {
        throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
      }
    }
  };
}
