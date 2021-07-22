import { Router } from 'express';
import cors from 'cors';
import ShelfController from '../controllers/ShelfController.js';

const router = Router();

router.route('/users/:userId')
    .get(ShelfController.getBooksFromShelf)
    .post(ShelfController.addBookToShelf)
    ;
router.route('/:id')
    .delete(ShelfController.returnBook)
    ;

export default router;