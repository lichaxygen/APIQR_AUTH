import express from 'express';
import { userLogin, userRegister } from '../controllers/users_api/users_api_controller.ts';

const router = express.Router();
router.post('/register', userRegister);
router.get('/login', userLogin);
export default router;

