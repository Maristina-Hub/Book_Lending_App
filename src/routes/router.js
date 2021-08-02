import express from 'express';

import authValidator from '../middlewares/AuthValidator.js';
import userController from '../controllers/UserController.js';
import adminController from '../controllers/AdminController.js';
import categoryRouter from './categoryRoute.js';
import bookRouter from './bookRoutes.js';


import historyRouter from './historyRoutes.js';

import favoriteRouter from './favoriteRoutes.js';
import shelfRouter from './shelfRoutes.js';
import shelfController from '../controllers/ShelfController.js';

const router = express.Router();
 
// USER ROUTES
   // For all
router.post("/register", userController.signUp);
router.post("/login", userController.login);

router.use('/shelf', shelfRouter)
router.use('/categories', categoryRouter)
router.use('/books', bookRouter)
router.use('/history', historyRouter)

router.use('/favorites', favoriteRouter)
router.route('/books/inventory/:type')
    .post(authValidator, shelfController.updateBookInventoryCount)
    ;

   // For all registered users
router.route('/user/profile/:id')
      .get(authValidator, userController.getProfile) // WILL BE HANDLED ON THE FE TO REDUCE DB CALLS
      .post(authValidator, userController.setDP);

// ADMIN ROUTE(S)
router.post("/admin/register", adminController.adminSignUp);

// FOR TONY
// router.get("/admin/dashboard/:id", userController.getDashboard);

export default router;