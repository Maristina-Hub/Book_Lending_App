import { Router } from "express";
import {FavouritesController} from "../controllers/favouritesController.js"

const router = Router();

router.route('/').get(FavouritesController.getFavourite).post(FavouritesController.createFavourite);
router.route('/:id').get(FavouritesController.getFavouriteById).delete(FavouritesController.deleteFavourite);



export default router;