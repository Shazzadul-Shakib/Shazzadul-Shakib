import mongoose, { Schema, models, model } from 'mongoose';

export interface IMessage {
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Message = models.Message || model<IMessage>('Message', MessageSchema);

export default Message;
