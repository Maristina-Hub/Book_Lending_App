import { Router } from 'express';

import  {BookController}  from '../controllers/bookContoller.js';

import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/')  
        .get(BookController.getBook)
        .post(authValidator, BookController.createBook)

router.route('/:id')
        .get(BookController.getBookById)
        .put(authValidator, BookController.editBookById)
        .delete(authValidator, BookController.deleteBook)

export default router;