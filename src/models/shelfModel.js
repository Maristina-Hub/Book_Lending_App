import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const shelfSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    bookId: {
      type: SchemaTypes.ObjectId,
      ref: 'book',
      required: true,
    },
    dateToReturn: {
        type: Date,
        required: true,
    }
  },

  { timestamps: true } // created at forms the dateBorrowed.
);

export const Shelf = model('shelf', shelfSchema);