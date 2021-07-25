import express from 'express';

import { getWishController, postWishController, updateWishController, deleteWishController } from '../controllers/WishController.js';


const router = express.Router();

router.post("/register", userController.signUp);

router.post("/SaveWishlist", postWishController);

router.get('/allwishLists', getWishController);

router.put('/UpdateWishlist/:id', updateWishController);

router.delete('/DeleteWishlist/:id', deleteWishController)

export default router;