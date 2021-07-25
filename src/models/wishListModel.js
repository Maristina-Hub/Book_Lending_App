import mongoose from 'mongoose';


const { Schema, model, SchemaTypes } = mongoose;

const wishSchema = new Schema(
    {
    Wish: [{
        type: SchemaTypes.ObjectId, 
        ref: "book"
    }]

    }
)

export const Wish = model('wish', wishSchema);