import mongoose, { Document, Schema } from 'mongoose';

// Definir la interfaz para el modelo Role con TypeScript
interface IRole extends Document {
  nombreRol: string;
  estadoRol: number;
}

// Esquema del modelo Role utilizando la interfaz IRole
const roleSchema: Schema = new mongoose.Schema({
  nombreRol: { type: String, required: true, unique: true, trim: true },
  estadoRol: { type: Number, enum: [1, 2], default: 1 }
}, { versionKey: false });

// Exportar el modelo Role utilizando la interfaz IRole y el esquema
export default mongoose.model<IRole>('Role', roleSchema);



