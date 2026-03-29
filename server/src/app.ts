import express, { Request, Response } from 'express';
import router from './routes/router';
import { globalErrorHandler } from './middleware/error-handler';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', router);
app.use(globalErrorHandler);