import express from 'express';
import WishController from '../controllers/WishController.js';

import authValidator from '../middlewares/AuthValidator.js';

const router = express.Router();

router.route("/addbook").post(authValidator, WishController.postWish);
//router.route.get(authValidator, WishController.getAllWish);
router.route('/').get(authValidator, WishController.getUserWishlist);
router.route('/removewish/').delete(authValidator, WishController.deleteWishlist);
router.route('/empty').delete( authValidator, WishController.deleteAllWish);

export default router;