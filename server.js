import express from 'express';
import cors from 'cors';
import router from './src/routes/router.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Just for testing
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to our Book-lending app.',
  });
});

app.use(router);

export default app;