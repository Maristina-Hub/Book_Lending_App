import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const wishlistSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      // required: true,
    },
    book: {
      type: SchemaTypes.ObjectId,
      ref: 'book',
      required: true,
    }
  },

  { timestamps: true } 
);

export const Wishlist = model('wishlist', wishlistSchema);