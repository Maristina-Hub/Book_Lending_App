import express from 'express';

import authValidator from '../middlewares/AuthValidator.js';
import userController from '../controllers/UserController.js';
import adminController from '../controllers/AdminController.js';
import categoryRouter from './categoryRoute.js';
import bookRouter from './bookRoutes.js';
<<<<<<< HEAD
import wishRouter from './wishlistRoute.js';
=======
import historyRouter from './historyRoutes.js';
import wishlistRouter from './wishlistRoutes.js';
import shelfRouter from './shelfRoutes.js';
import shelfController from '../controllers/ShelfController.js';
>>>>>>> 054abce160c9907c777a1822498f97f948bc3ea6

const router = express.Router();

// USER ROUTES
   // For all
router.post("/register", userController.signUp);
<<<<<<< HEAD
router.post("/login", userController.login)
=======
router.post("/login", userController.login);
>>>>>>> 054abce160c9907c777a1822498f97f948bc3ea6

router.use('/shelf', shelfRouter)
router.use('/categories', categoryRouter)
router.use('/books', bookRouter)
<<<<<<< HEAD
router.use('/books', wishRouter)
=======
router.use('/history', historyRouter)
router.use('/wishlists', wishlistRouter)
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

>>>>>>> 054abce160c9907c777a1822498f97f948bc3ea6

export default router;