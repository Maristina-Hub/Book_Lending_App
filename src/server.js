import express from 'express';
import cors from 'cors';
import router from './routes/router.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Just for testing
app.get('/', (req, res) => {
  res.json({
    status: 'success',
<<<<<<< HEAD
    message: 'Welcome to our book lending app',
=======
    message: 'Welcome to our Book-lending app.',
>>>>>>> 9b982f9a07678ccff33500e862d1dd64def95c62
  });
});

app.use("/", router);


export default app;