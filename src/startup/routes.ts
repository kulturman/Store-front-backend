import { Express } from 'express';
import usersRoutes from '../routes/users';
import productsRoutes from '../routes/products';

export function initializeRouting (app: Express) {
    app.use('/api/users', usersRoutes);
    app.use('/api/products', productsRoutes);
}