import { Router } from "express";
import { validateData } from "../../middlewares/validateData";
import { signUpValidation } from "./validation";
import { signUpService } from "./service";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.post(
    "/sign-up",
    validateData(signUpValidation),
    async (req, res, next) => {
        try {
            const { username, password, name } = req.body;
            const { accessToken, refreshToken } = await signUpService({
                username,
                password,
                name,
            });
            res.status(StatusCodes.CREATED).send({
                status: "success",
                data: { accessToken, refreshToken },
            });
        } catch (err) {
            next(err);
        }
    }
);

export { router };
