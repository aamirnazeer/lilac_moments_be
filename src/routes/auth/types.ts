import { z } from "zod";
import { signUpValidation } from "./validation";

export type SignUpData = z.infer<typeof signUpValidation>;
