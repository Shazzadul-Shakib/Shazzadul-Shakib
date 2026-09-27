import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDevInfo extends Document {
  key: string;
  value: string;
  valueType: 'string' | 'raw';
  visible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const DevInfoSchema = new Schema<IDevInfo>(
  {
    key: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
    valueType: { type: String, enum: ['string', 'raw'], default: 'string' },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

DevInfoSchema.index({ order: 1 });

const DevInfo: Model<IDevInfo> =
  mongoose.models.DevInfo || mongoose.model<IDevInfo>('DevInfo', DevInfoSchema);

export default DevInfo;
