import { Router } from "express";
import {FavouritesController} from "../controllers/favouritesController.js";

import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/').get(FavouritesController.getFavourite).post(FavouritesController.createFavourite);
router.route('/:id').get(FavouritesController.getFavouritesById).delete(FavouritesController.deleteFavourite);
// router.route('/UserId/:id').get(FavouritesController.getFavouriteByUserId)


export default router;