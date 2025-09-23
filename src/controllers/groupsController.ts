import { Request, Response } from 'express';
import Group from '../models/group';
import Match from '../models/match';

// Calcul des points et différence de buts pour chaque équipe
function computeStatsForGroups(
  groups: Array<{ group_en: string; name_en: string;[key: string]: any }>,
  matches: Array<{ group_en: string; homeTeam_en: string; awayTeam_en: string; scoreHomeTeam: number; scoreAwayTeam: number; status?: string;[key: string]: any }>
) {
  return groups.map(group => {
    // Filtrer les matchs du groupe (normalisation du nom du groupe)
    const groupMatches = matches.filter(m =>
      m.group_en.replace('Group ', '') === group.group_en.replace('Group ', '')
    );

    let w = 0, d = 0, l = 0, gf = 0, ga = 0, mp = 0;

    groupMatches.forEach(match => {
      // Ignorer les matchs non joués
      if (match.status === 'upcoming') return;

      // Si l'équipe est à domicile
      if (match.homeTeam_en === group.name_en) {
        mp++;
        gf += match.scoreHomeTeam;
        ga += match.scoreAwayTeam;
        if (match.scoreHomeTeam > match.scoreAwayTeam) w++;
        else if (match.scoreHomeTeam === match.scoreAwayTeam) d++;
        else l++;
      } else if (match.awayTeam_en === group.name_en) { // Correction: utiliser else if
        mp++;
        gf += match.scoreAwayTeam;
        ga += match.scoreHomeTeam;
        if (match.scoreAwayTeam > match.scoreHomeTeam) w++;
        else if (match.scoreAwayTeam === match.scoreHomeTeam) d++;
        else l++;
      }
    });

    const pts = w * 3 + d;
    const gd = gf - ga;

    return {
      ...group,
      mp, w, d, l, gf, ga, gd, pts
    };
  });
}

function miniClassement(
  teams: Array<{ name_en: string; [key: string]: any }>,
  matches: Array<{ homeTeam_en: string; awayTeam_en: string; scoreHomeTeam: number; scoreAwayTeam: number; status?: string; [key: string]: any }>
) {
  const teamNames = teams.map(t => t.name_en);
  const mutualMatches = matches.filter(
  m =>
    teamNames.includes(m.homeTeam_en) &&
    teamNames.includes(m.awayTeam_en) &&
    m.status !== 'upcoming' &&
    m.group_en.replace('Group ', '') === teams[0].group_en.replace('Group ', '')
);

  const stats = teams.map(team => {
    let w = 0, d = 0, l = 0, gf = 0, ga = 0, mp = 0;
    mutualMatches.forEach(match => {
      if (match.homeTeam_en === team.name_en) {
        mp++;
        gf += match.scoreHomeTeam;
        ga += match.scoreAwayTeam;
        if (match.scoreHomeTeam > match.scoreAwayTeam) w++;
        else if (match.scoreHomeTeam === match.scoreAwayTeam) d++;
        else l++;
      } else if (match.awayTeam_en === team.name_en) {
        mp++;
        gf += match.scoreAwayTeam;
        ga += match.scoreHomeTeam;
        if (match.scoreAwayTeam > match.scoreHomeTeam) w++;
        else if (match.scoreAwayTeam === match.scoreHomeTeam) d++;
        else l++;
      }
    });
    const pts = w * 3 + d;
    const gd = gf - ga;
    return { ...team, mp, w, d, l, gf, ga, gd, pts, group_en: team.group_en };
  });

  stats.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return 0;
  });

  return stats;
}

function applyHeadToHead(
  sorted: Array<{ mp: number; w: number; d: number; l: number; gf: number; ga: number; gd: number; pts: number; group_en: string; name_en: string; [key: string]: any }>,
  matches: Array<{ group_en: string; homeTeam_en: string; awayTeam_en: string; scoreHomeTeam: number; scoreAwayTeam: number; status?: string; [key: string]: any }>
) {
  let i = 0;
  while (i < sorted.length) {
    // Find the block of consecutive teams tied on pts, gd, gf
    let j = i + 1;
    while (
      j < sorted.length &&
      sorted[j].pts === sorted[i].pts &&
      sorted[j].gd === sorted[i].gd &&
      sorted[j].gf === sorted[i].gf
    ) {
      j++;
    }
    const tied = sorted.slice(i, j);
    if (tied.length > 1) {
      // If 2 teams, use head-to-head
      if (tied.length === 2) {
        const [a, b] = tied;
        const cmp = compareTeams(a, b, matches);
        if (cmp < 0) {
          sorted[i] = a;
          sorted[i + 1] = b;
        } else if (cmp > 0) {
          sorted[i] = b;
          sorted[i + 1] = a;
        }
        // If cmp == 0, leave as is
      } else {
        // If 3+ teams, use mini-ligue
        const mini = miniClassement(tied, matches);
        for (let k = 0; k < mini.length; k++) {
          sorted[i + k] = mini[k];
        }
      }
    }
    i = j;
  }
  return sorted;
}

function compareTeams(
  a: { group_en: string; name_en: string; w: number; d: number; l: number; gf: number; ga: number; gd: number; pts: number; [key: string]: any },
  b: { group_en: string; name_en: string; w: number; d: number; l: number; gf: number; ga: number; gd: number; pts: number; [key: string]: any },
  matches: Array<{ group_en: string; homeTeam_en: string; awayTeam_en: string; scoreHomeTeam: number; scoreAwayTeam: number; status?: string; [key: string]: any }>
) {
  // 1. Points
  if (b.pts !== a.pts) return b.pts - a.pts;
  // 2. Goal difference
  if (b.gd !== a.gd) return b.gd - a.gd;
  // 3. Goals scored
  if (b.gf !== a.gf) return b.gf - a.gf;

  // 4. Head-to-head (if still tied)
  const directMatch = matches.find(
    m =>
      ((m.homeTeam_en === a.name_en && m.awayTeam_en === b.name_en) ||
       (m.homeTeam_en === b.name_en && m.awayTeam_en === a.name_en)) &&
      m.status !== 'upcoming'
  );
  if (directMatch) {
    if (directMatch.homeTeam_en === a.name_en) {
      if (directMatch.scoreHomeTeam > directMatch.scoreAwayTeam) return -1;
      if (directMatch.scoreHomeTeam < directMatch.scoreAwayTeam) return 1;
    } else {
      if (directMatch.scoreAwayTeam > directMatch.scoreHomeTeam) return -1;
      if (directMatch.scoreAwayTeam < directMatch.scoreHomeTeam) return 1;
    }
  }
  return 0;
}

// Classement avec gestion des égalités
function sortGroups(
  groups: Array<{ group_en: string; name_en: string;[key: string]: any }>,
  matches: Array<{ group_en: string; homeTeam_en: string; awayTeam_en: string; scoreHomeTeam: number; scoreAwayTeam: number;[key: string]: any }>
): Array<{ mp: number; w: number; d: number; l: number; gf: number; ga: number; gd: number; pts: number; group_en: string; name_en: string; [key: string]: any }> {
  // Calculer stats
  const stats = computeStatsForGroups(groups, matches);
  // Tri initial par pts, gd, gf
  let sorted = stats.sort((a, b) => compareTeams(a, b, matches));
  // Appliquer le tri des égalités (head-to-head et mini-ligue)
  sorted = applyHeadToHead(sorted, matches);

  return sorted;
}

// get All Matches and Groups
async function getSortedGroups() {
  const groups = await Group.find().lean();
  const matchesRaw = await Match.find().lean();
  // Convertir les propriétés de score en nombres natifs et filtrer les champs nécessaires
  const matches = matchesRaw.map(m => ({
    group_en: m.group_en,
    homeTeam_en: m.homeTeam_en,
    awayTeam_en: m.awayTeam_en,
    scoreHomeTeam: typeof m.scoreHomeTeam === 'object' && m.scoreHomeTeam.valueOf ? Number(m.scoreHomeTeam.valueOf()) : Number(m.scoreHomeTeam),
    scoreAwayTeam: typeof m.scoreAwayTeam === 'object' && m.scoreAwayTeam.valueOf ? Number(m.scoreAwayTeam.valueOf()) : Number(m.scoreAwayTeam),
    status: m.status || 'played'  // 👈 Keep the match status
  }));

  // Grouper par group_en
  const groupNames = [...new Set(groups.map(g => g.group_en))];
  const result: { [key: string]: any } = {};
  groupNames.forEach(name => {
    const groupTeams = groups.filter(g => g.group_en === name);
    result[name] = sortGroups(groupTeams, matches);
  });
  return result;
}

class GroupsController {
  async getAllGroups(req: Request, res: Response): Promise<void> {
    try {
      const sortedGroups = await getSortedGroups();
      res.status(200).json(sortedGroups);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving groups', error });
    }
  }
}

export default new GroupsController();