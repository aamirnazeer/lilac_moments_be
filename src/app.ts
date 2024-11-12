import express, { json } from "express";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";

const app = express();

app.use(json());

app.use("/api", router);

app.use("/api/*", notFoundHandler);

app.use(errorHandler);

export { app };
