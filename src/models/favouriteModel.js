import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const favouriteSchema = new Schema(
  {
  
    userId: {
        type: SchemaTypes.ObjectId(),
        ref: 'user',
        required: true,
      },
   
    items: [
        {
          BookId: {
            type: SchemaTypes.ObjectId(),
            ref: 'book',
          },
          
        },
      ],
  },

  { timestamps: true }
);

export const Favourite = model('favourite', favouriteSchema);