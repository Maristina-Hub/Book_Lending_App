import express from 'express';
import userController from '../controllers/UserController.js';
import shelfRouter from './shelfRoutes.js';

const router = express.Router();

router.post("/register", userController.signUp);

app.use('/shelf', shelfRouter)

export default router;