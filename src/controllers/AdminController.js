import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { Admin } from '../models/adminModel.js';
import { User } from '../models/userModel.js';
import makeInstance from '../utils/seedHandler.js'

//initialize env
dotenv.config();

const AdminController = {
  adminSignUp: async (req, res) => {
    if(![req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.confirmPassword].every(Boolean)) {
      return res.status(400).json({ 
        status: "Failed",
        message: "Please fill all fields"
      });
    }

    req.body.role = "admin";
    req.body.subscriptionType = "platinum";
    const { firstname, lastname, email, password, confirmPassword, role, subscriptionType } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      
      if(existingUser) {
        return res.status(400).json({ 
          status: "Failed", message: "Oops! User already exists." 
        });
      }

      if(confirmPassword !== password) return res.status(400).json({
        status: "Failed", message: "Passwords don't match"
      })

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User(makeInstance(firstname, lastname, email, hashedPassword, role, subscriptionType));
      const newUser = await user.save();

      const admin = new Admin(newUser._id);
      const newAdmin = await admin.save();

      // Prevents password from being visible
      delete newUser._doc.password;
      delete newAdmin._doc.password;
      
      if(!Object.keys(newAdmin).length) {
        return res.status(500).json({ status: "Failed", message: "Server error" });
      }

      return jwt.sign(
        { id: newAdmin._id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if(err) throw err;

          res.status(200).json({
            status: 'success',
            data: {
              id: newAdmin._id,
              admin: `${newUser.lastname} ${newUser.firstname}`,
              token: "Bearer " + token
            },
            message: 'Admin account created successfully'
          });
        }
      );
    } catch(error) {
      return res.status(500).json({
        status: "Failed",
        error: error.message
      })
    }
  }
}

export default AdminController;