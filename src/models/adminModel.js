import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const adminSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
},
  { timestamps: true }
);

export const Admin = model('admin', adminSchema);