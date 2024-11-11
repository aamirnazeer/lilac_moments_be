import { z } from "zod";

export const signUpValidation = z.object({
    username: z.string(),
    password: z.string().min(4),
    name: z.string(),
});
