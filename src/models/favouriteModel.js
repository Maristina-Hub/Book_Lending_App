import mongoose from 'mongoose';
import  {BookController}  from '../controllers/bookContoller.js';

const {book} = BookController
const { Schema, model , SchemaTypes} = mongoose;

const favouriteSchema = new Schema(
  {
      UserId :{
        type: SchemaTypes.ObjectId,
        ref: 'user',
     

      }
,
    items: [
      {
           type: SchemaTypes.ObjectId,
            ref: 'book',
        },
        
       
       
      ],
  },

  { timestamps: true }
);

export const Favourite = model('favourite', favouriteSchema);