import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/userModel.js';

//initialize env
dotenv.config();

const UserController = {
  signUp: async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

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

    //find if email already exist
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'User already exists' });
    }

    //password hash
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if(hash) {
      const newUser = new User({ firstname, lastname, email, password: hash });
      const savedUser = await newUser.save();

      if(savedUser) {
        jwt.sign(
          { id: savedUser._id },
          process.env.SECRET,
          { expiresIn: 3600 },
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

    //password hash
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if(hash) {
      const newUser = new User({ firstname, lastname, email, password: hash, role: "admin" });
      const savedUser = await newUser.save();

      if(savedUser) {
        jwt.sign(
          { id: savedUser._id },
          process.env.SECRET,
          { expiresIn: 3600 },
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Provide email and password' });
    }

    const isUser = await User.findOne({ email });

    if (!isUser) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'record not found' });
    }

    //validate user password
    const match = await bcrypt.compare(password, isUser.password);

    if (!match) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'email or password is incorrect' });
    }

    jwt.sign(
        { id: isUser._id },
        process.env.SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          }

          return res.status(200).json({
            status: 'success',
            data: {
              token:"Bearer " + token,
              id: isUser._id,
              name: isUser.name,
              email: isUser.email,
            },
            message: 'successful',
          });
        }
      );    
  }

  
};

export default UserController;