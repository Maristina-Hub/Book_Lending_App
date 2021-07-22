import { Router } from 'express';

import CategoryController from '../controllers/CategoryContoller.js';


import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/categories').get(CategoryController.getCategory).post(authValidator, CategoryController.createCategory)
router.route('/categories/:id').put(authValidator, CategoryController.editCategory).delete()


export default router;