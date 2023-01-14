import { Router } from 'express';
import * as usersController from '../controllers/users';

const router = Router();

router.get('/', usersController.getAll);
router.post('/', usersController.create);
router.post('/auth', usersController.auth);

export default router;