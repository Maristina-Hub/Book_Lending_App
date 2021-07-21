import express from 'express';
import userController from '../controllers/UserController.js';

const router = express.Router();

router.post("/register", userController.signUp);

export default router;