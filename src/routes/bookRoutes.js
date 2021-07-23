import { Router } from 'express';

import BookController from '../controllers/bookController.js';


// import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/').get(BookController.getBook).post(BookController.createBook)
router.route('/:id').get(BookController.getBookById).delete()

export default router;