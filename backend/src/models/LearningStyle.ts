import mongoose, { Document, Schema } from 'mongoose';

interface ILearningStyle extends Document {
  style: string;
}

const learningStyleSchema: Schema = new Schema({
  style: { type: String, required: true }
});

const LearningStyle = mongoose.model<ILearningStyle>('LearningStyle', learningStyleSchema);

export default LearningStyle;
