import { Request, Response } from 'express';
import Group from '../models/group';

class GroupsController {
  async getAllGroups(req: Request, res: Response): Promise<void> {
    try {
      const groups = await Group.find();
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving groups', error });
    }
  }
}

export default new GroupsController();