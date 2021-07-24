import express from 'express';
import userController from '../controllers/UserController.js';

const router = express.Router();

router.post("/register", userController.signUp);
router.post("/login", userController.signUp);
export default router;