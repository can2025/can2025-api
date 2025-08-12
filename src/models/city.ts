import mongoose, { Schema, Document } from 'mongoose';

export interface ICity extends Document {
  _id : mongoose.Types.ObjectId;
  id: number;
  name_en: string;
  name_ar: string;
  name_fr: string;
  title1_en: string;
  title1_ar: string;
  title1_fr: string;
  content1_en: string;
  content1_ar: string;
  content1_fr: string;
  title2_en: string;
  title2_ar: string;
  title2_fr: string;
  content2_en: string;
  content2_ar: string;
  content2_fr: string;
  image1: string;
  image2: string;
  stadiumname_en: string;
  stadiumname_ar: string;
  stadiumname_fr: string;
  stadiumcapacity : number;
  stadiumlocation: string;
}

const matchSchema: Schema = new Schema({
  _id : { type: Schema.Types.ObjectId, auto: true },
  id: { type: Number, required: true },
  name_en: { type: String, required: true },
  name_ar: { type: String, required: true },
  name_fr: { type: String, required: true },
  title1_en: { type: String, required: true },
  title1_ar: { type: String, required: true },
  title1_fr: { type: String, required: true },
  content1_en: { type: String, required: true },
  content1_ar: { type: String, required: true },
  content1_fr: { type: String, required: true },
  title2_en: { type: String, required: true },
  title2_ar: { type: String, required: true },
  title2_fr: { type: String, required: true },
  content2_en: { type: String, required: true },
  content2_ar: { type: String, required: true },
  content2_fr: { type: String, required: true },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  stadiumname_en: { type: String, required: true },
  stadiumname_ar: { type: String, required: true },
  stadiumname_fr: { type: String, required: true },
  stadiumcapacity: { type: Number, required: true },  
  stadiumlocation: { type: String, required: true },
});

const City = mongoose.model<ICity>('City', matchSchema,'City');

export default City;