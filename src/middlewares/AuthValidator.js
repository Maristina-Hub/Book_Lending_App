import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/userModel.js';

//initialize env
dotenv.config();

const authValidator = async(req, res, next) => {
  const bearerToken = req.header('Authorization');
  if (!bearerToken) {
    return res.status(401).json({ status: 'fail', message: 'token not found' });
  }
  try {
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id)
  
    req.body.user = user._id;
    req.body.role = user.role;
    next();
  } catch (error) {
    
    return res.status(500).json({ status: 'fail', message: 'server error' });
  }
};

export default authValidator;