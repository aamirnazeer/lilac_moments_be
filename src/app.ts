import express, { json } from "express";
import { router } from "./routes";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "node:http";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import { initializeWebSocket } from "./websockets";

const app = express();
const server = createServer(app);

initializeWebSocket(server);

app.use(cors({ credentials: true, origin: true }));

app.use(json());
app.use(cookieParser());

app.use(morgan("dev"));

app.use(router);

app.use("/*", notFoundHandler);

app.use(errorHandler);

export { server };
