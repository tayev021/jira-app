import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: process.env.ORIGIN }));
app.use(express.json());

export { app };
