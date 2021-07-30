import express from 'express';

import authValidator from '../middlewares/AuthValidator.js';
import userController from '../controllers/UserController.js';
import adminController from '../controllers/AdminController.js';
import categoryRouter from './categoryRoute.js';
import bookRouter from './bookRoutes.js';
import favouriteRouter from './favouritesRoute.js'

const router = express.Router();

// USER ROUTES
   // For all
router.post("/register", userController.signUp);
router.post("/login", userController.login);
   // For all registered users
router.route('/user/profile/:id')
      .get(authValidator, userController.getProfile) // WILL BE HANDLED ON THE FE TO REDUCE DB CALLS
      .post(authValidator, userController.setDP);

// ADMIN ROUTE(S)
router.post("/admin/register", adminController.adminSignUp);

// FOR TONY
// router.get("/admin/dashboard/:id", userController.getDashboard);

router.use('/categories', categoryRouter)
router.use('/books', bookRouter)

router.use('/book/favourites', favouriteRouter)
export default router;