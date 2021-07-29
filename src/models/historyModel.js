import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const historySchema = new Schema(
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
    borrowedDate: {
        type: Date,
        required: true,
    }
  },

  { timestamps: true } 
);

export const History = model('history', historySchema);