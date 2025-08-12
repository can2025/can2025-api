import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IGroup extends Document {
  _id: mongoose.Types.ObjectId;
  name_en: string;
  name_fr: string;
  name_ar: string;
  flag: string;
  mp: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  group_en: string;
  group_fr: string;
  group_ar: string;
}

const groupSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name_en: { type: String, required: true },
  name_fr: { type: String, required: true },
  name_ar: { type: String, required: true },
  group_en: { type: String, required: true },
  group_fr: { type: String, required: true },
  group_ar: { type: String, required: true },
  flag: { type: String, required: true },
  mp: { type: Number, default: 0 },
  w: { type: Number, default: 0 },
  d: { type: Number, default: 0 },
  l: { type: Number, default: 0 },
  gf: { type: Number, default: 0 },
  ga: { type: Number, default: 0 },
  gd: { type: Number, default: 0 },
  pts: { type: Number, default: 0 },
});

const Group = mongoose.model<IGroup>('Group', groupSchema, 'Group');

export default Group;