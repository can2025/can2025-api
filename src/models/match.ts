import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
  _id : mongoose.Types.ObjectId;
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  group: string;
  status: string;
  channel: string;
  scoreHomeTeam : Number;
  scoreAwayTeam : Number;
}

const matchSchema: Schema = new Schema({
  _id : { type: Schema.Types.ObjectId, auto: true },
  id: { type: Number, required: true },
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  homeFlag: { type: String, required: true },
  awayFlag: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  city: { type: String, required: true },
  group: { type: String, required: true },
  status: { type: String, required: true },
  channel: { type: String, required: true },
  scoreHomeTeam : { type: Number, default: 0 },
  scoreAwayTeam : { type: Number, default: 0 },
});

const Match = mongoose.model<IMatch>('Match', matchSchema,'Match');

export default Match;