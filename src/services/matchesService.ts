import Match from '../models/match';

// Helper to parse date and time from the new model
function parseMatchDateTime(dateStr: string, timeStr: string): Date {
  // Assumes dateStr format: "Dec 21" or "21/12/2025", timeStr: "20:00"
  // Adjust parsing as needed for your actual date format
  const year = new Date().getFullYear();
  // If dateStr is "21/12/2025"
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    const [day, month, yearStr] = dateStr.split('/');
    return new Date(`${yearStr}-${month}-${day}T${timeStr}:00`);
  }
  // If dateStr is "Dec 21"
  return new Date(`${dateStr} ${year} ${timeStr}`);
}

// Get matches for today and tomorrow that have not started yet
export async function getUpcomingTwoDaysMatches() {
  const now = new Date();

  // Get today and tomorrow's dates as strings in the same format as date_en
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Format: "Dec 21"
  const options = { month: 'short', day: '2-digit' } as const;
  const todayStr = today.toLocaleString('en-US', options).replace(',', '');
  const tomorrowStr = tomorrow.toLocaleString('en-US', options).replace(',', '');

  // Fetch matches for today and tomorrow
  const matches = await Match.find({
    date_en: { $in: [todayStr, tomorrowStr] },
  }).lean();

  // Filter out matches that have already started
  return matches.filter(match => {
    const matchDateTime = parseMatchDateTime(match.date_en, match.time);
    return matchDateTime > now;
  });
}

export async function getUpcomingMatches() {
  const now = new Date();

  // Step 1: Fetch all future matches
  const allUpcoming = await Match.find({}).lean();

  // Step 2: Filter only matches in the future
  const futureMatches = allUpcoming.filter(match => {
    const matchDateTime = parseMatchDateTime(match.date_en, match.time);
    return matchDateTime > now;
  });

  // Step 3: Sort matches by date
  futureMatches.sort((a, b) => {
    const dateA = parseMatchDateTime(a.date_en, a.time);
    const dateB = parseMatchDateTime(b.date_en, b.time);
    return dateA.getTime() - dateB.getTime();
  });

  // Step 4: Get the first two distinct upcoming dates
  const uniqueDates: string[] = [];
  for (const match of futureMatches) {
    if (!uniqueDates.includes(match.date_en)) {
      uniqueDates.push(match.date_en);
    }
    if (uniqueDates.length === 2) break;
  }

  // Step 5: Return matches only for those dates
  return futureMatches.filter(match => uniqueDates.includes(match.date_en));
}

export async function getKnockoutMatches() {
  // Fetch all knockout matches
  const knockoutMatches = await Match.find({
    group_en: { $in: ["8th final", "Quarter final", "Semi final", "3rd Place", "final"] }
  }).lean();

  // Sort matches by date and time
  knockoutMatches.sort((a, b) => {
    const dateA = parseMatchDateTime(a.date_en, a.time);
    const dateB = parseMatchDateTime(b.date_en, b.time);
    return dateA.getTime() - dateB.getTime();
  });

  // Group matches by group_en
  const groupedMatches = knockoutMatches.reduce((acc, match) => {
    const group = match.group_en;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(match);
    return acc;
  }, {} as Record<string, typeof knockoutMatches>);

  return groupedMatches;
}

