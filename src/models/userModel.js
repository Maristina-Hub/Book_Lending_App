import mongoose from 'mongoose';
import validator from 'validator';

const { Schema, model } = mongoose;
const { isEmail } = validator;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password']
  },
  role: {
    type: String,
    enum: ['admin', 'normal'],
    default: 'normal'
  },
  subscriptionType: {
    type: String,
    enum: ['regular', 'premium', 'platinum'],
    default: 'regular'
  },
<<<<<<< HEAD
  borrowedBooks: [{
    dateBorrowed: {
      type: Date,
      default: Date.now
    },
    // type: Schema.Types.ObectId(),
    // ref: "shelf"
  }],
  // favourites: [{
  //   type: Schema.Types.ObectId,
  //   ref: "favourites"
  // }],
  wishList: [{
    type: Schema.Types.ObjectId,
    ref: "wishlist"
  }],
  // bookHistory: [
  //   // Controller to accept book details from borrowedBooks, and add returned date.
  // ]
=======
  imgurl: String
>>>>>>> 054abce160c9907c777a1822498f97f948bc3ea6
},
  { timestamps: true }
);

export const User = model('user', userSchema);