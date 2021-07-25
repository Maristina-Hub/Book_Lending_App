import express from 'express';

import { getWishController, postWishController, updateWishController, deleteWishController } from '../controllers/WishController.js';


import categoryRouter from './categoryRoute.js';

const router = express.Router();

// USER ROUTES
router.post("/register", userController.signUp);
router.post("/login", userController.login)

router.use('/categories', categoryRouter)


router.post("/SaveWishlist", postWishController);

router.get('/allwishLists', getWishController);



router.delete('/DeleteWishlist/:id', deleteWishController)

export default router;