import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { User } from '../models/userModel.js';

//initialize env
dotenv.config();

const UserController = {
  signUp: async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    try {
      if (!firstname || !lastname || !email || !password || !confirmPassword) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'Please fill all fields' });
      }

      if(password !== confirmPassword) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'Passwords do not match' });
      }

      // find if email already exists
      const isUserExist = await User.findOne({ email });

      if(isUserExist) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'User already exists' });
      }

      // password hash
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      if(hash) {
        const newUser = new User({ firstname, lastname, email, password: hash });
        const savedUser = await newUser.save();

        if(savedUser) {
          jwt.sign(
            { id: savedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: +process.env.JWT_EXPIRY },
            (err, token) => {
              if (err) {
                throw err;
              }

              res.status(200).json({ 
                status: 'success',
                data: {
                  token: "Bearer " + token,
                  id: savedUser._id,
                  firstname: savedUser.firstname,
                  lastname: savedUser.lastname,
                  email: savedUser.email
                },
                message: 'successful'
              });
            }
          );
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        error
      })
    }
  },

    signUpAdmin: async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Please fill all fields' });
    }

    if(password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Passwords do not match' });
    }

    //find if email already exist
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'User already exists' });
    }

    // password hash
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if(hash) {
      const newUser = new User({ firstname, lastname, email, password: hash, role: "admin" });
      const savedUser = await newUser.save();

      if(savedUser) {
        jwt.sign(
          { id: savedUser._id },
          process.env.SECRET,
          { expiresIn: +process.env.JWT_EXPIRY },
          (err, token) => {
            if (err) {
              throw err;
            }

            res.status(200).json({
              status: 'success',
              data: {
                token: "Bearer " + token,
                id: savedUser._id,
                firstname: savedUser.firstname,
                lastname: savedUser.lastname,
                email: savedUser.email,
              },
              message: 'successful',
            });
          }
        );
      }
    }
  },

  login: async (req, res) => {
    // Checking if all fields are filled
    if(![req.body.email, req.body.password].every(Boolean)) {
      return res.status(400).json({ 
        status: "Failed", 
        message: "Enter your email and password!"
      });
    }

    const { email, password } = req.body;

    try {
      // Search database for user matching email address given
      const existingUser = await User.findOne({ email });

      if(!existingUser || !Object.keys(existingUser).length) {
        return res.status(404).json({ status: "Failed", message: "Record not found" });
      }

      // Check if password matches password stored in the db
      const isMatch = await bcrypt.compare(password, existingUser.password);

      // Prevents saved password from being visible to user
      delete res.isMatch;

      if(!isMatch) {
        return res.status(404).json({ status: "Failed", message: "Email or password incorrect"});
      }

      // Payload to be sent in token
      const { firstname, lastname, _id, role, subscriptionType } = existingUser;

      const payload = {
        user: {
          _id,
          firstname,
          lastname,
          role,
          subscriptionType
        }
      }

      // Generate token
      const token = jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: +process.env.JWT_EXPIRY
      });

      // If token is not generated
      if(!token) return res.status(401).json({
        status: "Failed", 
        message: "Error logging in. Could not generate token."
      });

      return res.status(200).json({
        status: 'Success',
        message: "Logged in successfully",       
        data: {
          _id,
          firstname,
          lastname,
          email: existingUser.email,
          role,
          subscriptionType,
          token: `Bearer ${token}`
        }
      })

    } catch (error) {
      return res.status(500).json({ status: "Failed", message: error.message });
    }
  },
gt
  getProfile: async (req, res) => {
    const { id: _id } = req.params;
    
    try {
      const user = await User.findById(_id).select("-password");

      if(!user) return res.status(404).json({
        status: 'Failed',
        message: 'Oops! User not found'
      })

      return res.status(200).json({
        status: 'success',
        message: 'successful',
        data: user
      })
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        error: error.message
      })
    }
  },

  setDP: async (req, res) => {
    if(!req.file) {
      return res.status(400).json({
        status: "Failed",
        message: "Please select a picture to upload"
      })
    }

    try {
      const data = await User.findByIdAndUpdate(
        { _id: req.user.id },
        { imgurl: req.file.path },
        { new: true }
      );

      return res.status(200).json({
        data,
        status: "Success",
        message: "Image uploaded successfully!"
      })
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error.message
      })  
    }
  }
}

export default UserController;