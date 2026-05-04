import { model, Schema, Types } from 'mongoose';

export interface Sequence {
  _id: Types.ObjectId;
  seq: number;
}

const sequenceSchema = new Schema<Sequence>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  seq: {
    type: Number,
    default: 1,
  },
});

export const Sequence = model<Sequence>('Sequence', sequenceSchema);
