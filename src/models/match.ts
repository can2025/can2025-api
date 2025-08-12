import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
  _id : mongoose.Types.ObjectId;
  id: number;
  homeTeam_en: string;
  homeTeam_ar: string;
  homeTeam_fr: string;
  awayTeam_en: string;
  awayTeam_ar: string;
  awayTeam_fr: string;
  homeFlag: string;
  awayFlag: string;
  date_en: string;
  date_fr: string;
  date_ar: string;
  time: string;
  venue_en: string;
  venue_ar: string;
  venue_fr: string;
  city_en: string;
  city_ar: string;
  city_fr: string;
  group_en: string;
  group_ar: string;
  group_fr: string;
  status: string;
  channel_en: string;
  channel_ar: string;
  channel_fr: string;
  scoreHomeTeam : Number;
  scoreAwayTeam : Number;
}

const matchSchema: Schema = new Schema({
  _id : { type: Schema.Types.ObjectId, auto: true },
  id: { type: Number, required: true },
  homeTeam_en: { type: String, required: true },
  homeTeam_ar: { type: String, required: true },
  homeTeam_fr: { type: String, required: true },
  awayTeam_en: { type: String, required: true },
  awayTeam_ar: { type: String, required: true },
  awayTeam_fr: { type: String, required: true },
  homeFlag: { type: String, required: true },
  awayFlag: { type: String, required: true },
  date_en: { type: String, required: true },
  date_ar: { type: String, required: true },
  date_fr: { type: String, required: true },
  venue_en: { type: String, required: true },
  venue_ar: { type: String, required: true },
  venue_fr: { type: String, required: true },
  city_en: { type: String, required: true },
  city_ar: { type: String, required: true },
  city_fr: { type: String, required: true },
  time: { type: String, required: true },
  group_en: { type: String, required: true },
  group_ar: { type: String, required: true },
  group_fr: { type: String, required: true },
  channel_en: { type: String, required: true },
  channel_ar: { type: String, required: true },
  channel_fr: { type: String, required: true },
  status: { type: String, required: true },
  scoreHomeTeam : { type: Number, default: 0 },
  scoreAwayTeam : { type: Number, default: 0 },
});

const Match = mongoose.model<IMatch>('Match', matchSchema,'Match');

export default Match;