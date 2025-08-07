import mongoose, { Schema, Document } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  flag: string;
  mp: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  group: string;
}

const groupSchema: Schema = new Schema({
  name: { type: String, required: true },
  flag: { type: String, required: true },
  mp: { type: Number, default: 0 },
  w: { type: Number, default: 0 },
  d: { type: Number, default: 0 },
  l: { type: Number, default: 0 },
  gf: { type: Number, default: 0 },
  ga: { type: Number, default: 0 },
  gd: { type: Number, default: 0 },
  pts: { type: Number, default: 0 },
  group: { type: String, required: true },
});

const Group = mongoose.model<IGroup>('Groups', groupSchema);

export default Group;