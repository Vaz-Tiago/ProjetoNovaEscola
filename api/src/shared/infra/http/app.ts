import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';

import AppError from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';
import '@shared/container';

import routes from './routes';

createConnection();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

export default app;
