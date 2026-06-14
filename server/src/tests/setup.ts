import mongoose from 'mongoose';

beforeAll(async () => {
  const MONGO_TEST_URI = process.env.MONGO_TEST_URI as string;

  await mongoose
    .connect(MONGO_TEST_URI)
    .then(() => console.log('MongoDB for testing CONNECTED!'))
    .catch((error) => {
      console.error('MongoDB connection for testing ERROR!:', error);
    });
});

afterAll(async () => {
  await mongoose.disconnect();
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
});
