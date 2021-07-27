import mongoose from 'mongoose';


const { Schema, model , SchemaTypes} = mongoose;

const favouriteSchema = new Schema(
  {
    items: [
        {
          
            type: SchemaTypes.ObjectId,
            ref: 'book',
         
        }
      ],
  },

  { timestamps: true }
);

export const Favourite = model('favourite', favouriteSchema);