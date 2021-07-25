import express from 'express';
import userController from '../controllers/UserController.js';

import categoryRouter from './categoryRoute.js';

const router = express.Router();

// USER ROUTES
router.post("/register", userController.signUp);
router.post("/login", userController.login)

router.use('/categories', categoryRouter)


export default router;