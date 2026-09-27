import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteSettings extends Document {
  resumeUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    resumeUrl: { type: String, default: '' },
  },
  { timestamps: true },
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

export default SiteSettings;
