import express, { Express } from 'express';
import { initializeRouting } from './startup/routes';
import { config } from 'dotenv';

const app: Express = express();
const port = 3000;

config();

app.use(express.json());
initializeRouting(app);

app.listen(port, () => console.log(`App listening on port ${port}`));