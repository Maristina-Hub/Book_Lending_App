import { Router } from 'express';

import  {BookController}  from '../controllers/bookContoller.js';

import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/').get(BookController.getBook).post( BookController.createBook)
router.route('/:id').get(BookController.getBookById).put(BookController.editBookById).delete(BookController.deleteBook)

export default router;