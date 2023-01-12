import { Router } from 'express';
import * as usersController from '../controllers/users';

const router = Router();

router.get('/', usersController.getAll);
router.post('/', usersController.create);

export default router;