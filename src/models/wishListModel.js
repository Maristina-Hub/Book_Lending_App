import mongoose from 'mongoose';
import validator from 'validator';

const { Schema, model } = mongoose;

const wishSchema = new Schema(
    {

    Wish: {
        type: String,
        required: true
    }



    }
)

export const Wish = model('wish', wishSchema);