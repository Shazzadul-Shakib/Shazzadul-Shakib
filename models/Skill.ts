import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools';
  level?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Tools'],
    },
    level: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

SkillSchema.index({ category: 1, order: 1, name: 1 });

const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;
