import { Router } from 'express';

import CategoryController from '../controllers/CategoryContoller.js';
import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/')
    .get(CategoryController.getCategories)
    .post(authValidator, CategoryController.createCategory)
    ;
router.route('/:id')
    .get(CategoryController.getCategoryById)
    .put(authValidator, CategoryController.editCategory)
    .delete(authValidator, CategoryController.deleteCategory);

export default router;