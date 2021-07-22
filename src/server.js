import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to our book lending app',
  });
});


export default app;