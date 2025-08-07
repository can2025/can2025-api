import { Request, Response } from 'express';
import { getUpcomingMatches } from '../services/matchesService';
import Match from '../models/match';

class MatchesController {
  async getAllMatches(req: Request, res: Response): Promise<void> {
    try {
      const matches = await Match.find();
      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving matches', error });
    }
  }
  async getUpcomingMatches(req: Request, res: Response): Promise<void> {
    try {
      const matches = await getUpcomingMatches();
      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving upcoming matches', error });
    }
  }
}

export default new MatchesController();