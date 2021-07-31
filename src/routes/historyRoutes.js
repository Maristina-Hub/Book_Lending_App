import { Router } from 'express';
import cors from 'cors';
import HistoryController from '../controllers/HistoryController.js';
import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/users/:userId')
    .get(authValidator, HistoryController.getUserHistory)
    .post(authValidator, HistoryController.addUserHistory)
    ;

export default router;