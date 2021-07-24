import express from 'express';
import userController from '../controllers/UserController.js';
import shelfRouter from './shelfRoutes.js';

import categoryRouter from './categoryRoute.js';

const router = express.Router();

router.post("/register", userController.signUp);

app.use('/shelf', shelfRouter)
router.use('/categories', categoryRouter)

export default router;