import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import errorHandler from './utils/errorHandler.js';
import ErrorResponse from './utils/ErrorResponse.js';
import userRouter from './routes/userRouter.js';


const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/users', userRouter);


app.use('*', (req, res, next) => {
  next(new ErrorResponse(`Cannot find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export default app