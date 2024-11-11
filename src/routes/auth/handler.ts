import { Router } from "express";
import db from "../../db";
import { users } from "../../db/schema/users";

const router = Router();

router.get("/sign-up", async (req, res) => {
    try {
        const a = await db.select().from(users);
        res.send({ data: a });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

export { router };
