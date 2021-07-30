import { Router } from "express";
import {FavouritesController} from "../controllers/favouritesController.js";

import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/').get(authValidator, FavouritesController.getFavourite).post(authValidator,FavouritesController.createFavourite);
router.route('/:id').get(authValidator, FavouritesController.getFavouriteById).delete(FavouritesController.deleteFavourite);



export default router;