import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { User } from '../models/userModel.js';
import { Admin } from '../models/adminModel.js';
import makeInstance from '../utils/seedHandler.js';
import dbConnection from '../database/db.js';

dotenv.config();
dbConnection.getConnect();

const seed = async () => {
  const user = {
    firstname: process.env.OWNER_FIRSTNAME,
    lastname: process.env.OWNER_LASTNAME,
    email: process.env.OWNER_EMAIL,
    password: process.env.OWNER_PASSWORD,
    role: process.env.ROLE,
    subscriptionType: process.env.SUBSCRIPTION
  }

  const { firstname, lastname, email, password, role, subscriptionType } = user;

  try {
    const userAccount = await User.find({email});

    if(userAccount.length) {
      console.log("Oops! User already exists");
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User(makeInstance(firstname, lastname, email, hashedPassword, role, subscriptionType));
    const newUser = await user.save();

    const admin = new Admin(newUser._id);
    const newAdmin = await admin.save();

    // Prevents password from being visible
    delete newUser._doc.password;
    delete newAdmin._doc.password;

    console.log("Admin accounted created successfully!");

    process.exit();

  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

seed();