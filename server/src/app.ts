import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path:
    process.env.NODE_ENV === 'docker'
      ? path.resolve(__dirname, './../../.env')
      : path.resolve(__dirname, './../.env.local'),
});
import express from 'express';

const app = express();

app.get('/', (req, res, _next) => {
  res.status(200).send('<h1>Hello from Server</h1>');
});

export { app };
