import mongoose from 'mongoose';
import { app } from './app';

const MONGO_URI = process.env.MONGO_URI as string;
const PORT = process.env.SERVER_PORT || 8080;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB CONNECTED!'))
  .then(() => {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
  })
  .catch((error) => {
    console.error('MongoDB connection ERROR!:', error);
  });
