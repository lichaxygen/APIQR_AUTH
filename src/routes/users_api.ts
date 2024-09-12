import express from 'express';
import { userLogin, userLoginProvider, userRegister } from '../controllers/users_api_controller';
import { decodeIDToken } from '../utils/middleware/decodeIDToken';

const router = express.Router();
router.post('/register', userRegister);
router.get('/login', userLogin);
router.post('/auth/provider', decodeIDToken, userLoginProvider);
export default router;

