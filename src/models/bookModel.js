// import mongoose from 'mongoose';
// import validator from 'validator';

// const { Schema, model } = mongoose;

// export const bookSchema = new Schema({
//   title: uniqueRequiredLowString(),
//   author: requiredLowString(),
//   category: {
//     ...requiredLowString(),
//     enum: [ 
//       "comics", 
//       "fiction", 
//       "science", 
//       "non-ficiton", 
//       "business", 
//       "sports", 
//       "others", 
//       "finance", 
//       "health", 
//       "novel" 
//     ]
//   },
//   year: {
//     type: Number,
//     required: true,
//     min: 4
//   }
// }, { timestamps: true });

// export const Book = model("Book", bookSchema);