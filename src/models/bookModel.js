import mongoose from 'mongoose';

const { Schema, model } = mongoose;


const bookSchema = new Schema(
    {
    title: {
        type: String,
        required: true,
        max: 1026,
    },
    author: {
        type: String,
        required: true,
        max: 255,
    },
    category: {
        type: Number,
        required: true,
        max: 1024,
        enum: [ 
            "comics", 
            "fiction", 
            "science", 
            "non-ficiton", 
            "business", 
            "sports", 
            "others", 
            "finance", 
            "health", 
            "novel" 
        ]
    },
    description: {
        type: String,
        required: true,
        max: 101026,
    },
    year: {
        type: Number,
        required: true,
        min: 4
    },
    imageUrl: {
        type: String,
        required: true,
        max: 101026,
    },

    }, { timestamps: true });


export const Book = model('book', bookSchema);