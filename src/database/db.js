import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// const db = process.env.DB_CONNECTION_STRING;
const db = `mongodb://127.0.0.1:27017/book-lending-app`;

// <---- THE ASYNC WAY ---->
const dbConnection = {
  getConnect: async () => {
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
      });

      // On success
      console.log('Database connected successfully');

    } catch(err) {
      console.error(err.message);
      process.exit(1);
    }
  }
};

export default dbConnection;