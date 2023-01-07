import express, { Express } from 'express';

const app: Express = express();
const port = 3000;


app.listen(port, () => console.log(`App listening on port ${port}`));