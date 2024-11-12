import { app } from "./app";
import { ENV, PORT, DATABASE_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./core/env";

async function main() {
  if (!ENV) throw new Error("ENV not defined");
  if (!PORT) throw new Error("PORT not defined");
  if (!DATABASE_URL) throw new Error("DATABASE_URL not defined");
  if (!ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not defined");
  if (!REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET is not defined");

  app.listen(PORT, () => {
    console.log(`${ENV} server stated on port ${PORT}`);
  });
}

main()
  .then()
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
