import { Router } from 'express';
import cors from 'cors';
import ShelfController from '../controllers/ShelfController.js';
import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/users/:userId')
    .get(/*authValidator,*/ ShelfController.getBooksFromShelf)
    .post(/*authValidator,*/ ShelfController.addBookToShelf)
    .delete(/*authValidator,*/ ShelfController.returnBook)
    ;

export default router;