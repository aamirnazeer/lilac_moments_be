import { Router } from "express";
import { router as authRouter } from "./auth/handler";

const router = Router();

router.use("/auth", authRouter);

export { router };
