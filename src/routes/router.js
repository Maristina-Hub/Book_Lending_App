import express from 'express';
import userController from '../controllers/UserController.js';
import wishRouter from '../routes/wishlistRoute.js';

import categoryRouter from './categoryRoute.js';

const router = express.Router();

// USER ROUTES
router.post("/register", userController.signUp);
router.post("/login", userController.login)

router.use('/categories', categoryRouter);
router.use('/books', wishRouter)




export default router;