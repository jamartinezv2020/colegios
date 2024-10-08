import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  learningStyle: string[];
}

const studentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  learningStyle: { type: [String], default: [] },
});

const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;


