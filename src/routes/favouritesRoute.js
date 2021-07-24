import { Router } from "express";
import FavouritesController from "../controllers/favouritesControlller";

const router = Router();

router.route('/favourite' , FavouritesController).get().post().
router.route('/favourite/:id' , FavouritesController).get().post().delete();

export default router;