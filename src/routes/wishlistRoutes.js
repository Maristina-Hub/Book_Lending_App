import { Router } from 'express';
import cors from 'cors';
import WishlistController from '../controllers/WishlistController.js';
import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/')
    .get(authValidator, WishlistController.getUserWishlist)
    .post(authValidator, WishlistController.addBookToWishlist)
    .delete(authValidator, WishlistController.removeBookFromWishlist);

export default router;