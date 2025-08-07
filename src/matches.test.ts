import mongoose from 'mongoose';
import Match from './models/match'; // Adjust path if needed

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/moroccocan', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);
});

afterAll(async () => {
  await mongoose.disconnect();
});

test('should retrieve all matches from the database and show details', async () => {
    console.log('test started');

    const matches = await Match.find();
    console.log('Matches retrieved:', matches.length);
    matches.forEach(match => {
    console.log("Match city:", match);   
    console.log({
      //id: match.id,
      //homeTeam: match.homeTeam,
      //awayTeam: match.awayTeam,
      //date: match.date,
      //time: match.time,
      //venue: match.venue,
      city: match.city,
      //group: match.group,
      //status: match.status,
      //channel: match.channel,
    });
  });
  expect(Array.isArray(matches)).toBe(true);

  // Log details for each match
  console.log('test ended');

  // Optionally check for at least one match
  // expect(matches.length).toBeGreaterThan(0);
});