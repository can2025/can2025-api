import { Request, Response } from 'express';
import News from '../models/news';

class NewsController {
  async getLastNews(req: Request, res: Response): Promise<void> {
    try {
      const news = await News.find().sort({ date: -1 }).limit(10);
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving news', error });
    }
  }
}

export default new NewsController();