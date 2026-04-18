import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExperience extends Document {
  role: string;
  company: string;
  period: string;
  type: string;
  description: string[];
  tech: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    description: [{ type: String, trim: true }],
    tech: [{ type: String, trim: true }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

ExperienceSchema.index({ order: 1, createdAt: -1 });

const Experience: Model<IExperience> =
  mongoose.models.Experience ||
  mongoose.model<IExperience>('Experience', ExperienceSchema);

export default Experience;
