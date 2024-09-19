import mongoose, { Model, PopulatedDoc, Schema, Types } from 'mongoose';
import { IUserDocument } from './userModel';

interface IMessage {
  sender: Types.ObjectId | PopulatedDoc<IUserDocument>;
  receiver: Types.ObjectId | PopulatedDoc<IUserDocument>;
  content: string;
  messageType: 'image' | 'text';
  isOpened: boolean;
}

export interface IMessageDocument extends IMessage, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema<IMessageDocument>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    messageType: {
      type: String,
      required: true,
      enum: ['image', 'text']
    },
    isOpened: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Message: Model<IMessageDocument> =
  mongoose.models?.Message || mongoose.model('Message', messageSchema);

export default Message;
