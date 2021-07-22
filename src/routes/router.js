import express from 'express';
import userController from '../controllers/UserController.js';

import categoryRouter from './categoryRoute.js';

const app = express();

const router = express.Router();

router.post("/register", userController.signUp);

app.use('/', categoryRouter)


export default router;