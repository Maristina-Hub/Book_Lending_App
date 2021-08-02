import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const shelfSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    book: {
      type: SchemaTypes.ObjectId,
      ref: 'book',
      required: true,
    },
    dateToReturn: {
        type: Date,
        default: null
    }
  },

  { timestamps: true } 
);

export const Shelf = model('shelf', shelfSchema);