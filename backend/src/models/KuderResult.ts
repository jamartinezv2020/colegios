// Ubicación: src/models/KuderResult.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IKuderResult extends Document {
  userId: mongoose.Types.ObjectId;
  scores: {
    [category: string]: number;
  };
  createdAt: Date;
}

const KuderResultSchema: Schema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  scores: { type: Map, of: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IKuderResult>('KuderResult', KuderResultSchema);
