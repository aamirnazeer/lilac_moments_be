import { config } from "dotenv";

config();

const ENV = process.env.ENV;
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

export { ENV, PORT, DATABASE_URL };
