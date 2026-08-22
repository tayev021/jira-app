import mongoose from 'mongoose';

beforeAll(async () => {
  const MONGO_TEST_URI = process.env.MONGO_TEST_URI;

  if (!MONGO_TEST_URI) {
    throw new Error('MONGO_TEST_URI is not defined');
  }

  await mongoose.connect(MONGO_TEST_URI);

  console.log('MongoDB for testing CONNECTED!');
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
