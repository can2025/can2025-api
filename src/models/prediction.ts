import mongoose, { Schema, Document } from 'mongoose';

export interface IPrediction extends Document {
  userId: mongoose.Types.ObjectId;
  matchId: mongoose.Types.ObjectId;
  predictedHomeScore: number;
  predictedAwayScore: number;
  pointsAwarded: number;
  createdAt: Date;
}

const predictionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  matchId: { type: Schema.Types.ObjectId, required: true, ref: 'Match' },
  predictedHomeScore: { type: Number, required: true },
  predictedAwayScore: { type: Number, required: true },
  pointsAwarded: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Prediction = mongoose.model<IPrediction>('Prediction', predictionSchema, 'Prediction');

export default Prediction;