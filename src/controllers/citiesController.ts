import { Request, Response } from 'express';
import City from '../models/city';

class CitiesController {
  async getAllCities(req: Request, res: Response): Promise<void> {
    try {
      const cities = await City.find();
      res.status(200).json(cities);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving cities', error });
    }
  }
}

export default new CitiesController();