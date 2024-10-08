declare module '../models/Student' {
    import { Document, Model } from 'mongoose';
  
    interface IStudent extends Document {
      name: string;
      age: number;
    }
  
    const Student: Model<IStudent>;
    export default Student;
  }
  