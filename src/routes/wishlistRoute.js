import express from 'express';
import WishController from '../controllers/WishController.js';

import authValidator from '../middlewares/AuthValidator.js';

const router = express.Router();

router.route("/wishlist/addbook").post(authValidator, WishController.postWish);
router.route('/wishlist').get(authValidator,WishController.getWish);
router.route('/removewish/:id').delete(authValidator, WishController.deleteWish)
router.route('/wishlist/empty').delete( authValidator, WishController.deleteAllWish);

export default router;