import { Router } from 'express';
import cors from 'cors';
import FavoriteController from '../controllers/FavoriteController.js';
import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/')
    .get(authValidator, FavoriteController.getUserFavorites)
    .post(authValidator, FavoriteController.addBookToFavorites)
    .delete(authValidator, FavoriteController.removeBookFromFavorites)
    ;

export default router;