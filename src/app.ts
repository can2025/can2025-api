import express from 'express';
import mongoose from 'mongoose';
import groupsRoutes from './routes/groups';
import matchesRoutes from './routes/matches';
import newsRoutes from './routes/news';
import * as dotenv from 'dotenv';

// Load environment-specific .env file

if (process.env.NODE_ENV !== 'development') {
  dotenv.config({ path: '.env.production' });
}

console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';
//const MONGODB_URI ="mongodb://localhost:27017/can2025"

console.log('Connecting to MongoDB at:', MONGODB_URI);
app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.use('/api/groups', groupsRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/news', newsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the CAN 2025 API');
});

