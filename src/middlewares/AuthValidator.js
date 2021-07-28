import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/userModel.js';

//initialize env
dotenv.config();

const authValidator = async(req, res, next) => {
  const bearerToken = req.header('Authorization');
  if (!bearerToken) {
    return res.status(401).json({ status: 'fail', message: 'unauthorized' });
  }
  try {
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id)
    req.body.user = user._id;
    req.body.access = user.access;
    next();
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'server error' });
  }
};

//  const authValidator = async (req, res, next)=> {
//   const token =req.headers.authorization;
//   if(!token)
//   return res.status(401).json({status: 'fail', message: 'unathorized'});

//   try{
//     let bearerToken =token.split(' ')[1];

//     await jwt.verify(bearerToken, process.env.SECRET, (err, decode) => {
//         if(err)
//        return res
//         .status(500)
//         .json({status: false, message: 'Failed to authenticate token.'});
//         next();
//     });
//   }catch(err){
//     return res.status(401).json({
//       status: 'fail',
//       message: 'unauthorized'
//   });
//   }

 

//  }

export default authValidator;