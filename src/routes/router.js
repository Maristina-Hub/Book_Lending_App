import express from 'express';
import userController from '../controllers/UserController.js';

import categoryRouter from './categoryRoute.js';

const router = express.Router();

router.post("/register", userController.signUp);

router.use('/categories', categoryRouter)


export default router;