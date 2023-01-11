import { Express } from 'express';
import usersRoute from '../routes/users';

export function initializeRouting (app: Express) {
    app.use('/users', usersRoute);
}