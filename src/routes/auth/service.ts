import { SignUpData } from "./types";
import { findUserByUsername, signUpController } from "./controller";
import { createHashedPassword } from "./helper";
import { CustomError } from "../../utils/CustomError";
import { StatusCodes } from "http-status-codes";

export const signUpService = async (data: SignUpData) => {
    const existingUser = await findUserByUsername(data.username);
    if (existingUser.length) {
        throw new CustomError(StatusCodes.CONFLICT, "data existing");
    }

    data.password = createHashedPassword(data.password);
    const newUser = await signUpController(data);
    const accessToken = "abcdef";
    const refreshToken = "abcdef";
    return { accessToken, refreshToken };
};
