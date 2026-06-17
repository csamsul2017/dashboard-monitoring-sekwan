import express from 'express';
import cors from 'cors';
import userRouter from './src/routes/userRouter.js';
import authRouter from './src/routes/authRouter.js';
import errorHandler from './src/middlewares/errorHandler.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', authRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
