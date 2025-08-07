import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  _id : mongoose.Types.ObjectId;
  title_en: string;
  title_ar: string;
  title_fr: string;
  category: string;
  image: string;
  date: string;
  content_en: string;
  content_ar: string;
  content_fr: string;

}

const matchSchema: Schema = new Schema({
  _id : { type: Schema.Types.ObjectId, auto: true },
  title_en: { type: String, required: true },
  title_ar: { type: String, required: true },
  title_fr: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
  content_en: { type: String, required: true },
  content_ar: { type: String, required: true },
  content_fr: { type: String, required: true },
});

const News = mongoose.model<INews>('News', matchSchema,'News');

export default News;