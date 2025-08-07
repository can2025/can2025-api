import Match from '../models/match';

function parseMatchDateTime(dateStr: string, timeStr: string): Date {
  // Assumes dateStr format: "Dec 21", timeStr format: "20:00"
  const year = new Date().getFullYear();
  return new Date(`${dateStr} ${year} ${timeStr}`);
}

export async function getUpcomingMatches() {
  const allMatches = await Match.find().sort({ date: 1, time: 1 }).lean();
  const now = new Date();

  // Group matches by match day
  const grouped: { [key: string]: any[] } = {};
  allMatches.forEach(match => {
    const matchDate = parseMatchDateTime(match.date, match.time);
    const key = matchDate.toDateString();
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push({ ...match, matchDate });
  });

  // Find the nearest match days with upcoming matches
  const sortedDays = Object.keys(grouped)
    .map(day => new Date(day))
    .filter(day => day >= new Date(now.toDateString())) // today or future
    .sort((a, b) => a.getTime() - b.getTime());

  const result: any[] = [];
  let daysCollected = 0;

  for (const day of sortedDays) {
    const matches = grouped[day.toDateString()];
    const upcoming = matches.filter(m => m.matchDate > now);

    if (upcoming.length > 0) {
      // If current time is before all matches, show all for the day
      result.push(...(upcoming.length === matches.length ? matches : upcoming));
      daysCollected++;

      if (daysCollected === 2) break;
    }
  }

  return result;
}
