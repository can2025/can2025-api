import { Request, Response } from 'express';
import Group from '../models/group';
import Match from '../models/match';

// Calcul des points et différence de buts pour chaque équipe
function computeStatsForGroups(
  groups: Array<{ group_en: string; name_en: string; [key: string]: any }>,
  matches: Array<{ group_en: string; homeTeam_en: string; awayTeam_en: string; scoreHomeTeam: number; scoreAwayTeam: number; [key: string]: any }>
) {
  return groups.map(group => {
    // Filtrer les matchs du groupe
    const groupMatches = matches.filter(m => 
      m.group_en.replace('Group ', '') === group.group_en.replace('Group ', '')
    );

    // Initialiser stats
    let w = 0, d = 0, l = 0, gf = 0, ga = 0;

    groupMatches.forEach(match => {
      // Si l'équipe est à domicile
      if (match.homeTeam_en === group.name_en) {
        gf += match.scoreHomeTeam;
        ga += match.scoreAwayTeam;
        if (match.scoreHomeTeam > match.scoreAwayTeam) w++;
        else if (match.scoreHomeTeam === match.scoreAwayTeam) d++;
        else l++;
      }
      // Si l'équipe est à l'extérieur
      if (match.awayTeam_en === group.name_en) {
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
      w, d, l, gf, ga, gd, pts
    };
  });
}

// Classement avec gestion des égalités
function sortGroups(
  groups: Array<{ group_en: string; name_en: string; [key: string]: any }>,
  matches: Array<{ group_en: string; homeTeam_en: string; awayTeam_en: string; scoreHomeTeam: number; scoreAwayTeam: number; [key: string]: any }>
) {
  // Calculer stats
  const stats = computeStatsForGroups(groups, matches);

  // Fonction de comparaison
  function compare(
    a: { group_en: string; name_en: string; w: number; d: number; l: number; gf: number; ga: number; gd: number; pts: number; [key: string]: any },
    b: { group_en: string; name_en: string; w: number; d: number; l: number; gf: number; ga: number; gd: number; pts: number; [key: string]: any }
  ) {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;

    // Confrontation directe si égalité
    const directMatch = matches.find(
      m =>
        ((m.homeTeam_en === a.name_en && m.awayTeam_en === b.name_en) ||
         (m.homeTeam_en === b.name_en && m.awayTeam_en === a.name_en)) &&
        m.group_en === a.group_en
    );
    if (directMatch) {
      if (directMatch.scoreHomeTeam > directMatch.scoreAwayTeam)
        return directMatch.homeTeam_en === a.name_en ? -1 : 1;
      if (directMatch.scoreHomeTeam < directMatch.scoreAwayTeam)
        return directMatch.homeTeam_en === a.name_en ? 1 : -1;
    }
    return 0;
  }

  // Trier les équipes du groupe
  return stats.sort(compare);
}

// Exemple d'utilisation
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
    // Ajoutez d'autres propriétés nécessaires ici si besoin
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
      console.log('Retrieved groups:', sortedGroups);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving groups', error });
    }
  }
}

export default new GroupsController();