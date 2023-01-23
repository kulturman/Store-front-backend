import express, { Express } from "express";
import { configureDotEnv } from "./helpers/config-helper";
import { initializeRouting } from "./startup/routes";

const app: Express = express();
const port = 3000;

configureDotEnv();
app.use(express.json());
initializeRouting(app);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`App listening on port ${port}`));
}

export default app;
