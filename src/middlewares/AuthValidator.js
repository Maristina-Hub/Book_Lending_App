import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//initialize env
dotenv.config();

const authValidator = async(req, res, next) => {
  // Check if there is a token
  if(!req.headers.authorization) {
    return res.status(401).json({ status: "Failed", message: "Unauthorized user"});
  }
  
  const bearerToken = req.headers.authorization.split(" ");

  try {
    // Check if token is of appropriate format
    if(bearerToken[0] !== "Bearer") {
      return res.status(400).json({
        status: "Failed",
        message: "Invalid token format"
      })
    }

    if(!bearerToken[1]) {
      return res.status(400).json({
        status: "Failed",
        message: "Unauthorized"
      })
    }

    const token = bearerToken[1];

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // If token verification failed
    if(!decodedToken) {
      return res.status(401).json({
        status: "Failed",
        message: "Unauthorized",
        error: "Invalid auth token"
      });
    }

    // Add user's details to the req object for all protected routes
    req.user = {
      id: decodedToken.user._id,
      role: decodedToken.user.role,
      subscription: decodedToken.user.subscriptionType
    };

    // If all things pass, allow user proceed
    next();
    
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
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