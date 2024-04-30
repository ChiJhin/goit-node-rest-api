import express from 'express';

import { getCurrent, logIn, logout, signUp, updateAvatar } from '../controllers/userControllers.js';
import { checkUserLogIn, checkUserSingUp, protect } from '../middlewares/authMiddlewares.js';
import { uploadAvatar } from '../middlewares/userMiddlewares.js';

const router = express.Router();

router.post('/register', checkUserSingUp, signUp);
router.post('/login', checkUserLogIn, logIn);
router.post('/logout', protect, logout);
router.get('/current', protect, getCurrent);
router.patch('/avatars', protect, uploadAvatar, updateAvatar);

export { router };
