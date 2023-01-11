import express, { Express } from 'express';
import { initializeRouting } from './startup/routes';

const app: Express = express();
const port = 3000;

app.use(express.json());
initializeRouting(app);

app.listen(port, () => console.log(`App listening on port ${port}`));