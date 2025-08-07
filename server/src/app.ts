import express, { Request, Response } from 'express';
import router from './routes';
import { errorHandler } from './middleware/error.middleware';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);