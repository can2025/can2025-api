import mongoose from 'mongoose';
import Group from '../models/group';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/moroccocan', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);
});

afterAll(async () => {
  await mongoose.disconnect();
});

test('should connect to the database and fetch all groups', async () => {
  const groups = await Group.find();
  console.log('Fetched groups:', groups);
  expect(Array.isArray(groups)).toBe(true);
  // Optionally check for at least one group:
  // expect(groups.length).toBeGreaterThan(0);
});