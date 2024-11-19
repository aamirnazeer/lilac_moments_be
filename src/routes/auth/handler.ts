import { Router } from "express";
import { validateData } from "../../middlewares/validateData";
import { signInValidation, usersInsertValidation, refreshTokenValidation } from "./validation";
import { signUpService, signInService, signOutService, refreshTokenService } from "./service";
import { StatusCodes } from "http-status-codes";
import { validateRefreshTokenMiddleware, validateRequestMiddleware } from "./middleware";

const router = Router();

router.post("/sign-up", validateData(usersInsertValidation), async (req, res, next) => {
  try {
    const { username, password, name } = req.body;
    const { accessToken, refreshToken } = await signUpService({
      username,
      password,
      name,
    });
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.status(StatusCodes.CREATED).send({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
});

router.post("/sign-in", validateData(signInValidation), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { accessToken, refreshToken } = await signInService({
      username,
      password,
    });
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.status(StatusCodes.OK).send({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
});

router.post("/sign-out", async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    await signOutService(refreshToken);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(StatusCodes.OK).send({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
});

router.post("/refresh-token", validateRefreshTokenMiddleware, async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const { accessToken } = await refreshTokenService(refreshToken);
    res.cookie("accessToken", accessToken);
    res.status(StatusCodes.OK).send({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
});

router.post("/protected", validateRequestMiddleware, async (_req, res, next) => {
  try {
    res.status(StatusCodes.OK).send({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
});

export { router };
