import { Router } from 'express';

import BookController from '../controllers/bookController.js';


// import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/').get(BookController.getBook).post(authValidator, CategoryController.createCategory)
router.route('/:id').put(authValidator, CategoryController.editCategory).delete()

export default router;