import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  learningStyle?: string[]; // Añadir esta propiedad si es necesaria
}

const userSchema: Schema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  learningStyle: { type: [String], default: [] }, // Añadir esta propiedad si es necesaria
});

export default mongoose.model<IUser>('User', userSchema);









