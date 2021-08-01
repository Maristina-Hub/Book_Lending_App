import express from 'express';
import multer from 'multer';

import authValidator from '../middlewares/AuthValidator.js';
import userController from '../controllers/UserController.js';
import adminController from '../controllers/AdminController.js';
import categoryRouter from './categoryRoute.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// USER ROUTES
   // For all
router.post("/register", userController.signUp);
router.post("/login", userController.login);
   // For all registered users
router.route('/user/profile/:id')
      .get(authValidator, userController.getProfile) // WILL BE HANDLED ON THE FE TO REDUCE DB CALLS
      .post(authValidator, upload.single('image'), userController.setDP);

// ADMIN ROUTE(S)
router.post("/admin/register", adminController.adminSignUp);

// FOR TONY
// router.get("/admin/dashboard/:id", userController.getDashboard);

router.use('/categories', categoryRouter);


export default router;