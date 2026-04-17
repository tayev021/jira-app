import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './router';
import { globalErrorHandler } from './shared/middleware/globalErrorHandler';

const app = express();

app.use(morgan('dev'));
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', router);

app.use(globalErrorHandler);

export { app };
