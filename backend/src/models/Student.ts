import { Schema, Document, model } from 'mongoose';
import { isFuture, differenceInYears } from 'date-fns';

// Definición de la interfaz para el estudiante
export interface IStudent extends Document {
  name: string;
  category: string;
  email: string;
  birthdate: Date;
  age: number;
  learningStyle?: string[];
  responses?: number[];
  createdAt: Date;
}

// Esquema del estudiante
const studentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birthdate: {
    type: Date,
    required: true,
    validate: {
      validator: (value: Date) => !isFuture(value),
      message: 'Birthdate cannot be in the future.',
    },
  },
  age: {
    type: Number,
    required: true,
    min: [5, 'Age must be at least 5'],
  },
  learningStyle: { type: [String], default: [] },
  responses: { type: [Number], default: [] },
  createdAt: { type: Date, default: Date.now },
});

// Middleware para calcular la edad antes de guardar
studentSchema.pre<IStudent>('save', function (next) {
  this.age = differenceInYears(new Date(), this.birthdate);
  if (this.age < 5) {
    throw new Error('Age must be at least 5');
  }
  next();
});

export default model<IStudent>('Student', studentSchema);



