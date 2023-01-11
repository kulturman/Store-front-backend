import { Router } from 'express';
import * as usersController from '../controllers/users';

const router = Router();

router.get('/', usersController.getAll);

export default router;