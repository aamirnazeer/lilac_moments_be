import { DATABASE_URL } from "../core/env";

import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
const db = drizzle(DATABASE_URL!);

export default db;
